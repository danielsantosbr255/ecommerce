import Link from "next/link";
import {
  FaArrowLeft,
  FaCode,
  FaShoppingCart,
  FaGithub,
  FaDatabase,
  FaGamepad,
  FaBrain,
  FaLayerGroup,
  FaTerminal,
  FaDocker,
  FaMailBulk,
  FaLaptopCode,
  FaServer,
  FaBook,
  FaLock,
} from "react-icons/fa";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre - Fireforge Labs",
  description: "Aqui falo tudo sobre como foi feito o e-commerce e sobre mim.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16">
      <div className="container mx-auto px-4 relative">
        {/* Botão de Voltar Elegante */}
        <Link href="/" className="inline-flex items-center hover:text-primary transition duration-300 mb-12 group">
          <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition duration-300" />
          <span className="font-medium">Voltar para a Loja</span>
        </Link>

        {/* Seção de Apresentação Pessoal com Imagem */}
        <section className="bg-white shadow-xs rounded-xl p-8 mb-12 overflow-hidden">
          <div className="md:flex items-center -mx-8">
            <div className="md:w-1/3 px-8 mb-6 md:mb-0 text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto shadow-xs">
                <Image src="/power.jpg" alt="Minha Foto de Perfil" fill objectFit="cover" />

                <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping"></div>
              </div>
              <h2 className="text-xl font-semibold mt-4">Olá! Eu sou o Daniel.</h2>
              <p className="text-sm">Desenvolvedor Web Júnior & Criador deste Projeto</p>
              <p className="flex mt-2 font-semibold items-center justify-center gap-1">
                <FaMailBulk className="text-tx-primary" /> Contato:{" "}
                <Link href="mailto:asdanielsantos@gmail.com" className="text-primary hover:underline">
                  asdanielsantos@gmail.com
                </Link>
              </p>
            </div>
            <div className="md:w-2/3 px-8">
              <p className="leading-relaxed mb-4">
                Sou um desenvolvedor web júnior em transição de carreira (cerca de 2 anos de experiência em projetos próprios),
                com 8 anos de experiência em programação no desenvolvimento de jogos com Python. Nos últimos meses, mergulhei no
                desenvolvimento web e construí este projeto fullstack de e-commerce como uma vitrine prática das minhas
                habilidades.
              </p>
              <p className="leading-relaxed mb-4">
                No processo, além do que implementei diretamente no projeto, também aprendi diversas tecnologias e ferramentas que
                ampliaram minha visão como desenvolvedor, incluindo Docker, Nginx, e a administração de servidores Linux em AWS
                EC2.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-tx-primary">
                  <FaCode className="mr-2 text-tx-primary" /> Fullstack
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-tx-primary">
                  <FaTerminal className="mr-2 text-tx-primary" /> Backend
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-tx-primary">
                  <FaGamepad className="mr-2 text-tx-primary" /> Dev. de Jogos
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-tx-primary">
                  <FaBrain className="mr-2 text-tx-primary" /> Lógica
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Detalhada do Projeto E-commerce */}
        <section className="bg-white shadow-xs rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaShoppingCart className="text-primary text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-tx-primary">Descrição Detalhada do Projeto</h2>
          </div>
          <p className="leading-relaxed mb-4">
            Este projeto de e-commerce foi construído para simular um ambiente de produção real, enfrentando desafios técnicos e
            arquiteturais que refletem as exigências de aplicações modernas. A experiência foi um divisor de águas na minha
            jornada como desenvolvedor, permitindo aplicar boas práticas e consolidar conhecimentos em uma stack sólida.
          </p>
        </section>

        {/* Seção de Backend */}
        <section className="bg-white shadow-xs rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaServer className="text-primary text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-tx-primary">Backend: Arquitetura e Segurança</h2>
          </div>
          <p className="leading-relaxed mb-4">
            O backend foi desenvolvido em Node.js, inspirado no Nest.js, com separação em módulos, serviços e controllers,
            garantindo manutenibilidade e escalabilidade.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <span className="font-semibold">Segurança:</span> Autenticação com JWT (HttpOnly), proteção contra sequestro de
              sessão e autorização com RBAC (Role-Based Access Control).
            </li>
            <li>
              <span className="font-semibold">Banco de Dados:</span> PostgreSQL com Prisma ORM.
            </li>
            <li>
              <span className="font-semibold">Validação:</span> Biblioteca Zod, aplicada no backend e no frontend.
            </li>
            <li>
              <span className="font-semibold">Hospedagem:</span> Deploy no Render, com testes de configuração na AWS EC2.
            </li>
          </ul>
        </section>

        {/* Seção de Frontend */}
        <section className="bg-white shadow-xs rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaLaptopCode className="text-primary text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-tx-primary">Frontend: Desafios com Next.js 15</h2>
          </div>
          <p className="leading-relaxed mb-4">
            O frontend foi desenvolvido em Next.js 15 + TypeScript com o App Router, enfrentando a curva de aprendizado de Server
            Components vs Client Components. O projeto contou com a criação de um HTTP Client customizado e a implementação de um
            proxy para autenticação em produção.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <span className="font-semibold">Gerenciamento de Estado:</span> ContextAPI, Zustand e Tanstack React Query.
            </li>
            <li>
              <span className="font-semibold">Formulários:</span> React Hook Form + FormData.
            </li>
          </ul>
        </section>

        {/* Seção de Recursos e Lições Aprendidas */}
        <section className="bg-white shadow-xs rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaBook className="text-primary text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-tx-primary">Recursos da Aplicação e Lições Aprendidas</h2>
          </div>
          <p className="leading-relaxed mb-4">
            O sistema conta com autenticação, gerenciamento de produtos, pedidos, categorias, reviews e carrinho de compras. Cada
            funcionalidade foi construída do zero, simulando a complexidade de um e-commerce real.
          </p>
          <p className="leading-relaxed mb-4">
            <span className="font-semibold">Principais aprendizados:</span> fluxo de trabalho Git e GitHub, prevenção contra XSS e
            CSRF, e a diferença entre ambientes de desenvolvimento e produção.
          </p>
        </section>

        {/* Seção Detalhada Sobre Minhas Habilidades */}
        <section className="bg-white shadow-xs rounded-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <FaCode className="text-primary text-3xl mr-4" />
            <h2 className="text-xl font-semibold text-tx-primary">Minhas Habilidades e Ferramentas</h2>
          </div>
          <p className="leading-relaxed mb-4">
            Além do que implementei no projeto, também adquiri experiência com as seguintes tecnologias e ferramentas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-md border border-lines p-6 hover:shadow-xs transition duration-300">
              <div className="flex items-center mb-3">
                <FaLayerGroup className="text-primary text-xl mr-3" />
                <h3 className="text-lg font-semibold text-tx-primary">Frontend</h3>
              </div>
              <p className="text-sm">JavaScript, TypeScript, Next.js, React, HTML, CSS, Tailwind CSS</p>
            </div>
            <div className="rounded-md border border-lines p-6 hover:shadow-xs transition duration-300">
              <div className="flex items-center mb-3">
                <FaTerminal className="text-primary text-xl mr-3" />
                <h3 className="text-lg font-semibold text-tx-primary">Backend</h3>
              </div>
              <p className="text-sm">Node.js, NestJS (conhecimento), Prisma, RESTful APIs</p>
            </div>
            <div className="rounded-md border border-lines p-6 hover:shadow-xs transition duration-300">
              <div className="flex items-center mb-3">
                <FaDatabase className="text-primary text-xl mr-3" />
                <h3 className="text-lg font-semibold text-tx-primary">Bancos de Dados</h3>
              </div>
              <p className="text-sm">PostgreSQL, MongoDB (conhecimento), NoSQL</p>
            </div>
            <div className="rounded-md border border-lines p-6 hover:shadow-xs transition duration-300">
              <div className="flex items-center mb-3">
                <FaLock className="text-primary text-xl mr-3" />
                <h3 className="text-lg font-semibold text-tx-primary">Autenticação & Segurança</h3>
              </div>
              <p className="text-sm">JWT, Cookies HTTP-only, Zod para Validação, RBAC</p>
            </div>
            <div className="rounded-md border border-lines p-6 hover:shadow-xs transition duration-300">
              <div className="flex items-center mb-3">
                <FaDocker className="text-primary text-xl mr-3" />
                <h3 className="text-lg font-semibold text-tx-primary">Infraestrutura & DevOps</h3>
              </div>
              <p className="text-sm">Docker, Docker Compose, Git, GitHub, Nginx, Linux, AWS EC2</p>
            </div>
            <div className="rounded-md border border-lines p-6 hover:shadow-xs transition duration-300">
              <div className="flex items-center mb-3">
                <FaBrain className="text-primary text-xl mr-3" />
                <h3 className="text-lg font-semibold text-tx-primary">Habilidades Essenciais</h3>
              </div>
              <p className="text-sm">Lógica de Programação, Resolução de Problemas, Aprendizado Contínuo</p>
            </div>
          </div>
        </section>

        {/* Rodapé Sofisticado */}
        <footer className="text-center mt-16 py-8 border-t border-gray-300">
          <p className="mb-2">
            Feito com <span className="text-primary font-semibold">Next.js 15</span>,{" "}
            <span className="font-semibold">TypeScript</span> e muita paixão <FaCode className="inline" />
          </p>
          <p className="text-sm flex gap-1 justify-center">
            Conecte-se comigo e veja mais do meu trabalho no
            <Link
              href="https://github.com/danielsantosbr255"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              GitHub
              <FaGithub />
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

export default AboutPage;
