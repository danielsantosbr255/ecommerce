const service = require("./auth.service");
const tokenUtil = require("../../common/utils/token.util");
const CustomError = require("../../common/utils/CustomError");
const authValidator = require("../../common/validators/auth.validator");

const signUp = async (req, res) => {
  const validatedData = authValidator.signUp(req.body);
  const { name, email, password } = validatedData;

  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const ipAddress = req.ip;

  const session = await service.signUp({ name, email, password, userAgent, ipAddress });

  tokenUtil.setCookiesTokens(res, session.refreshToken);
  res.status(201).json({ session });
};

const signIn = async (req, res) => {
  const { email, password } = authValidator.signIn(req.body);

  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const ipAddress = req.ip;

  const session = await service.signIn({ email, password, userAgent, ipAddress });
  tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

  res.json({ session });
};

const signOut = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const ipAddress = req.ip;
  const userId = req.user.id;

  try {
    await service.signOut({ userId, refreshToken, userAgent, ipAddress });

    tokenUtil.clearTokens(res);

    return res.status(200).json({ message: "Deslogado com sucesso" });
  } catch (error) {
    tokenUtil.clearTokens(res);
    throw new CustomError("Token inválido. Deslogado com sucesso", 401);
  }
};

const refreshToken = async (req, res) => {
  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const refreshToken = req.cookies.refreshToken; // || req.headers["authorization"]?.split(" ")[1];

  console.log("🍪 [REFRESH TOKEN]: ", refreshToken);

  try {
    const session = await service.revalidateTokens({ refreshToken, userAgent, ipAddress });
    console.log("⚙️ [CONTROLLER] - refresh session: ", session);
    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  } catch (error) {
    tokenUtil.clearTokens(res);
    throw new CustomError("Token inválido", 401);
  }
};

const validate = async (req, res) => {
  const [access, refresh] = req.headers.authorization?.split(",");
  const accessToken = access?.split("=")[1];
  const hasRefreshToken = refresh?.split("=")[1];

  try {
    tokenUtil.verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ message: "Token válido", user: req.user });
  } catch (error) {
    if (!hasRefreshToken) throw new CustomError("Token inválido", 401);
    refreshToken(req, res);
  }
};

module.exports = { signUp, signIn, signOut, refreshToken, validate };
