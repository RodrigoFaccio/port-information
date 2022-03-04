-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 03-Mar-2022 às 15:53
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `port_information`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `assuntos`
--

DROP TABLE IF EXISTS `assuntos`;
CREATE TABLE IF NOT EXISTS `assuntos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_id_admin` int(11) NOT NULL,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor` varchar(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `assuntos`
--

INSERT INTO `assuntos` (`id`, `f_id_admin`, `nome`, `cor`) VALUES
(3, 1, 'Capacitação', '#909090'),
(4, 1, 'Boletins', '#cc0000'),
(5, 1, 'ANTAQ', '#fff'),
(6, 1, 'Rápidas', '#fff'),
(7, 1, 'DOU', '#909090'),
(8, 1, 'MINFRA', '#909090'),
(9, 1, 'Portos', '#cc0000');

-- --------------------------------------------------------

--
-- Estrutura da tabela `email`
--

DROP TABLE IF EXISTS `email`;
CREATE TABLE IF NOT EXISTS `email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assunto` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `criado_em` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_usuario`
--

DROP TABLE IF EXISTS `grupo_usuario`;
CREATE TABLE IF NOT EXISTS `grupo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `menus`
--

DROP TABLE IF EXISTS `menus`;
CREATE TABLE IF NOT EXISTS `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `menus`
--

INSERT INTO `menus` (`id`, `nome`, `descricao`) VALUES
(1, 'Informativo Portuário', 'Descrição Teste '),
(2, 'Notícias', 'Descrição Teste '),
(3, 'Análises', 'Descrição Teste '),
(4, 'Artigos', 'Descrição Teste '),
(5, 'Diário Oficial', 'Descrição Teste '),
(6, 'Estatísticas', 'Descrição Teste '),
(7, 'Legislação Portuária', 'Descrição Teste '),
(8, 'Leilões e Audiências Públicas', 'Descrição Teste '),
(9, 'Portvídeos', 'Descrição Teste '),
(10, 'Portcast', 'Descrição Teste ');

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacao`
--

DROP TABLE IF EXISTS `notificacao`;
CREATE TABLE IF NOT EXISTS `notificacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensagem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enviado_em` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
CREATE TABLE IF NOT EXISTS `publicacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_id_menu` int(11) DEFAULT NULL,
  `f_id_assunto` int(11) DEFAULT NULL,
  `f_id_tags` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titulo` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitulo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_publicacao` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `video` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `conteudo_especial` tinyint(1) NOT NULL DEFAULT '0',
  `tela_inicial` tinyint(1) NOT NULL DEFAULT '1',
  `data_deadline` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `html` text COLLATE utf8mb4_unicode_ci,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagem` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arquivo` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT 'HTML',
  `oculto` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `publicacao`
--

INSERT INTO `publicacao` (`id`, `f_id_menu`, `f_id_assunto`, `f_id_tags`, `titulo`, `subtitulo`, `data_publicacao`, `video`, `conteudo_especial`, `tela_inicial`, `data_deadline`, `html`, `url`, `imagem`, `arquivo`, `tipo`, `oculto`) VALUES
(1, NULL, NULL, NULL, 'Teste', 'Subit', '2022-02-28 04:53:19.967', 'qualquerurl', 0, 1, '2022-02-28 04:53:19.967', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 1),
(2, NULL, NULL, NULL, 'Teste', 'Subit', '2022-02-28 04:53:38.935', 'qualquerurl', 0, 1, '2022-02-28 04:53:38.935', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 1),
(3, NULL, NULL, NULL, 'Teste', 'Subit', '2022-02-28 04:54:06.283', 'qualquerurl', 0, 1, '2022-02-28 04:54:06.283', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 1),
(4, NULL, NULL, NULL, 'Teste', 'Subit', '2022-02-28 04:54:15.786', 'qualquerurl', 0, 1, '2022-02-28 04:54:15.786', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 1),
(5, NULL, NULL, NULL, 'Teste', 'Subit', '2022-02-28 04:54:46.177', 'qualquerurl', 0, 1, '2022-02-28 04:54:46.177', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 1),
(6, NULL, NULL, NULL, 'Teste', 'Subit', '2022-02-28 04:56:16.765', 'qualquerurl', 0, 1, '2022-02-28 04:56:16.765', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 1),
(7, NULL, NULL, '5', 'Teste', 'Subit', '2022-02-28 05:03:44.893', 'qualquerurl', 0, 1, '2022-02-28 05:03:44.893', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 0),
(8, 2, 5, '5', 'Teste', 'Subit', '2022-02-28 05:19:33.901', 'qualquerurl', 0, 1, '2022-02-28 05:19:33.901', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 0),
(9, 2, 5, '5', 'Testedddddddddddddddddddw', 'Subit', '2022-02-28 05:24:36.836', 'qualquerurl', 0, 1, '2022-02-28 05:24:36.836', 'nem tem', 'quaqluer', NULL, NULL, 'qualuer', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `tags`
--

INSERT INTO `tags` (`id`, `nome`) VALUES
(1, 'Porto'),
(3, 'Comex'),
(4, 'Licitações'),
(5, 'Agronegócio'),
(6, 'Cereais'),
(7, 'Não Sei');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ogranizacao` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissao` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Usuário',
  `criado_em` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `app` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('cbf2aba0-f117-4baf-863e-80a77b67f40f', '391fd0cf447f59f73907c338c451cb6a0507a8a0954f92f602d6854d6391e30d', '2022-02-14 20:15:01.096', '20220214201501_first_migration', NULL, NULL, '2022-02-14 20:15:01.040', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
