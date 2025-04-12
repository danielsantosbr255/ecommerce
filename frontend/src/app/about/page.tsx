import Link from "next/link";
import {
  FaArrowLeft,
  FaCode,
  FaShoppingCart,
  FaPuzzlePiece,
  FaGithub,
  FaDatabase,
  FaGamepad,
  FaBrain,
  FaLayerGroup, // Para Fullstack
  FaTerminal,
  FaDocker, // Para Backend/DevOps
} from "react-icons/fa";
import Image from "next/image";

// Importe uma imagem sua (opcional)
import profileImage from "../../../public/placeholder.jpg"; // Substitua pelo caminho da sua imagem

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16">
      <div className="container mx-auto px-4 relative">
        {/* Botão de Voltar Elegante */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-amber-500 transition duration-300 mb-12 group"
        >
          <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition duration-300" />
          <span className="font-medium">Voltar para a Loja</span>
        </Link>

        {/* Seção de Apresentação Pessoal com Imagem */}
        <section className="bg-white shadow-xl rounded-xl p-8 mb-12 overflow-hidden">
          <div className="md:flex items-center -mx-8">
            <div className="md:w-1/3 px-8 mb-6 md:mb-0 text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto shadow-md">
                <Image
                  src={profileImage} // Use a sua imagem aqui
                  alt="Minha Foto de Perfil"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 rounded-full bg-amber-500 opacity-20 animate-ping"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Olá! Eu sou o Desenvolvedor Aqui.</h2>
              <p className="text-gray-600 text-sm">
                Estudante de Desenvolvimento Web & Criador deste Projeto
              </p>
            </div>
            <div className="md:w-2/3 px-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Minha jornada no mundo digital é uma aventura constante, desde as complexas mecânicas dos
                jogos que desenvolvi com Python ao universo fascinante do desenvolvimento web. Durante mais de
                8 anos, o código foi minha tela e os jogos, minhas criações. Agora, estou focado em construir
                experiências interativas na web.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Este projeto de e-commerce é um passo crucial nessa transição, permitindo-me explorar a fundo
                o desenvolvimento fullstack. Embora meu foco principal seja o backend, a visão completa do
                ciclo de desenvolvimento é o que me motiva.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                  <FaCode className="mr-2 text-gray-500" /> Fullstack
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                  <FaTerminal className="mr-2 text-gray-500" /> Backend
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                  <FaGamepad className="mr-2 text-gray-500" /> Desenvolvimento de Jogos
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                  <FaBrain className="mr-2 text-gray-500" /> Lógica de Programação
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Detalhada Sobre Minhas Habilidades */}
        <section className="bg-white shadow-xl rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaCode className="text-amber-500 text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-gray-800">Minhas Habilidades e Ferramentas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-md border border-gray-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center mb-3">
                <FaLayerGroup className="text-amber-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold text-gray-700">Frontend</h3>
              </div>
              <p className="text-gray-600 text-sm">
                JavaScript, TypeScript, Next.js, React, HTML, CSS, Tailwind CSS
              </p>
            </div>
            <div className="rounded-md border border-gray-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center mb-3">
                <FaTerminal className="text-amber-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold text-gray-700">Backend</h3>
              </div>
              <p className="text-gray-600 text-sm">Node.js, NestJS (conhecimento), Prisma, RESTful APIs</p>
            </div>
            <div className="rounded-md border border-gray-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center mb-3">
                <FaDatabase className="text-amber-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold text-gray-700">Bancos de Dados</h3>
              </div>
              <p className="text-gray-600 text-sm">PostgreSQL, MongoDB (conhecimento), NoSQL</p>
            </div>
            <div className="rounded-md border border-gray-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center mb-3">
                <FaPuzzlePiece className="text-amber-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold text-gray-700">Autenticação & Segurança</h3>
              </div>
              <p className="text-gray-600 text-sm">JWT, Cookies HTTP-only, Zod para Validação</p>
            </div>
            <div className="rounded-md border border-gray-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center mb-3">
                <FaDocker className="text-amber-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold text-gray-700">Infraestrutura & DevOps</h3>
              </div>
              <p className="text-gray-600 text-sm">Docker, Git, GitHub</p>
            </div>
            <div className="rounded-md border border-gray-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center mb-3">
                <FaBrain className="text-amber-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold text-gray-700">Habilidades Essenciais</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Lógica de Programação, Resolução de Problemas, Aprendizado Contínuo
              </p>
            </div>
          </div>
        </section>

        {/* Seção Dedicada ao Projeto de E-commerce */}
        <section className="bg-white shadow-xl rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaShoppingCart className="text-amber-500 text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-gray-800">Sobre o Meu Projeto de E-commerce</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Este projeto de e-commerce é mais do que um simples aprendizado; é a materialização da minha
            paixão pelo desenvolvimento web e uma forma de consolidar meus conhecimentos em um cenário prático
            e desafiador.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Desde a arquitetura do backend até a experiência do usuário no frontend, cada detalhe foi
            cuidadosamente pensado e implementado. O objetivo principal foi explorar um amplo espectro de
            tecnologias e aplicar as melhores práticas de desenvolvimento.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Sistema de autenticação completo com JWT e cookies HTTP-only para segurança.</li>
            <li>Validação robusta de entrada de dados utilizando Zod.</li>
            <li>Utilização do Prisma como ORM para interação eficiente com o banco de dados PostgreSQL.</li>
            <li>Conhecimento e exploração de bancos de dados NoSQL como MongoDB.</li>
            <li>Implementação de conceitos de RESTful APIs para comunicação entre frontend e backend.</li>
            <li>Containerização com Docker para facilitar o desenvolvimento e a implantação.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Este projeto serve como um portfólio dinâmico, demonstrando minhas habilidades e minha dedicação
            em criar soluções web completas e bem estruturadas.
          </p>
        </section>

        {/* Rodapé Sofisticado */}
        <footer className="text-center text-gray-500 mt-16 py-8 border-t border-gray-300">
          <p className="mb-2">
            Feito com <span className="text-amber-500 font-semibold">Next.js 15</span>,{" "}
            <span className="font-semibold">TypeScript</span> e muita paixão <FaCode className="inline" />
          </p>
          <p className="text-sm flex gap-1 justify-center">
            Conecte-se comigo e veja mais do meu trabalho no
            <Link
              href="https://github.com/danielsantosbr255"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline flex items-center gap-1"
            >
              GitHub<FaGithub/>
            </Link>
          </p>
          <p className="text-xs mt-2">
            © {new Date().getFullYear()} Daniel Santos/Fireforge Labs - Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
};

// Importe os novos ícones e a Image do Next.js

// Certifique-se de ter uma imagem de perfil em sua pasta 'public' (ou ajuste o caminho)

export default AboutPage;
