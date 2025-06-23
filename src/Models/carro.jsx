import carroImageParticular from "./assets/ImagemTeste.png";
import carroImageSeguradora from "./assets/image.png";

export class Carro {
  constructor({
    id,
    nomeVeiculo,
    dtCriacao,
    imagem,
    valorTotal,
    descricao,
    fK_TipoCarro,
    proprietario,
    createAt,
    updateAt,
  }) {
    this.id = id;
    this.nomeVeiculo = nomeVeiculo;
    this.dtCriacao = dtCriacao || createAt;
    this.imagem = imagem;
    this.preco = valorTotal;
    this.descricao = descricao;
    this.tipoCarro = fK_TipoCarro; // Pode ser 'particular' ou 'seguradora'
    this.proprietario = proprietario;
    this.UpdateAt = updateAt;
  }

  // Método que atribui um valor padrao para a imagem
  setImagemPadrao() {
    if (this.tipoCarro === "particular") {
      this.imagem = carroImageParticular;
    } 
    else if (this.tipoCarro === "seguradora") {
      this.imagem = carroImageSeguradora;
    }
    else
    {
      this.imagem = "https://c4.wallpaperflare.com/wallpaper/193/556/883/car-neon-chevrolet-corvette-race-cars-hd-wallpaper-preview.jpg"; // Imagem padrão genérica
    }
  }
}
