import request from "supertest";
import app from "../../app.module"; // onde você exporta o Express

describe("Produtos - API", () => {
  it("Deve listar todos os produtos", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve criar um novo produto", async () => {
    const res = await request(app).post("/api/products").send({
      title: "Produto Teste",
      description: "Descrição teste",
      price: 100.0,
      stock: 5,
      slug: "produto-teste",
      brandId: 1,
      categoryId: 1,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Produto Teste");
  });
});
