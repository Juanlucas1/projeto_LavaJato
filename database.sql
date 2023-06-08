-- Tabela cliente
CREATE TABLE cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  telefone VARCHAR(20)
);

-- Tabela lava_jato
CREATE TABLE lava_jato (
  id_lava_jato INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  telefone VARCHAR(20),
  email VARCHAR(255),
  localizacao VARCHAR(255),
  servicos VARCHAR(255),
  ceep VARCHAR(10)
);

-- Tabela proprietario
CREATE TABLE proprietario (
  id_proprietario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  telefone VARCHAR(20)
);

-- Tabela agenda
CREATE TABLE agenda (
  id_servico INT AUTO_INCREMENT PRIMARY KEY,
  servicos VARCHAR(255),
  hora VARCHAR(10),
  data VARCHAR(10)
);
