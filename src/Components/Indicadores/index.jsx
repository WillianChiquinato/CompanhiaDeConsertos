import FormatadorMoeda from "../Utilitario/util";
import useApiController from "../../services/controller";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import PieChart from "./PieChart";
import "./styles.css";

function IndicadorSuperior({ type, color, title, value }) {
  return (
    <div className="IndicadorSuperior">
      <span className="tituloIndicador">{title}</span>
      <span
        className={`valorIndicador ${
          color === "lucro"
            ? "lucro"
            : color === "despesa"
            ? "despesa"
            : color === "faturamento"
            ? "faturamento"
            : color === "ticketMedio"
            ? "ticketMedio"
            : "numerico"
        }`}
      >
        {type === "monetario" ? (
          color === "lucro" ? (
            <>
              <FormatadorMoeda valor={value} />
              <FontAwesomeIcon icon={faArrowUp} />
            </>
          ) : color === "despesa" ? (
            <>
              <FormatadorMoeda valor={value} />
              <FontAwesomeIcon icon={faArrowDown} />
            </>
          ) : (
            <>
              <FormatadorMoeda valor={value} />
              <FontAwesomeIcon icon={faArrowsUpDown} />
            </>
          )
        ) : (
          value
        )}
      </span>
    </div>
  );
}

export default function Indicadores() {
  const [totalCarros, setTotalCarros] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalLucro, setTotalLucro] = useState(0);
  const [totalFaturamento, setTotalFaturamento] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);

  // Dados para os gráficos
  const [carrosPorTipo, setCarrosPorTipo] = useState([]);
  const [despesasPorCategoria, setDespesasPorCategoria] = useState([]);
  const [funcionariosData, setFuncionariosData] = useState([]);
  const [resumoFinanceiro, setResumoFinanceiro] = useState([]);
  const [ticketMedioPorTipo, setTicketMedioPorTipo] = useState([]);

  const adicionaisFuncionarioController = useApiController(
    "adicionaisfuncionario"
  );
  const FuncionarioController = useApiController("funcionario");
  const carroController = useApiController("carro");
  const tipoCarroController = useApiController("tipocarro");
  const despesaController = useApiController("despesa");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Buscar os Adicionais por Funcionário
        const adicionaisPorFuncionario =
          await adicionaisFuncionarioController.getAllGroupedByFuncionario();

        // 2. Buscar os Funcionarios
        const funcionariosData = await FuncionarioController.getAll();

        // 3. Buscar os Carros
        const carrosData = await carroController.getAll();

        // 3.1. Buscar os Tipos de Carros
        const tiposData = await tipoCarroController.getAll();

        // 4. Buscar as Despesas
        const despesasData = await despesaController.getAll();

        // 5. Calcular os totais
        // Carros.
        setTotalCarros(carrosData.length);

        // Despesas.
        const totalDespesasValue = despesasData.reduce(
          (total, despesa) => total + Number(despesa.Valor),
          0
        );
        const totalFuncionariosValue = funcionariosData.reduce(
          (total, funcionario) => {
            const adicionais = adicionaisPorFuncionario[funcionario.id] || [];
            const totalAdicionais = adicionais.reduce(
              (sum, adicional) => sum + Number(adicional.Valor),
              0
            );
            return total + Number(funcionario.Salario) + totalAdicionais;
          },
          0
        );

        const totalDespesaValue = totalFuncionariosValue + totalDespesasValue;
        setTotalDespesas(totalDespesaValue);

        //Faturamento.
        const faturamentoValue = carrosData.reduce(
          (total, carro) => total + Number(carro.ValorTotal),
          0
        );
        setTotalFaturamento(faturamentoValue);

        //Lucro.
        const totalLucroValue = faturamentoValue - totalDespesaValue;
        setTotalLucro(totalLucroValue);

        //Ticket Médio.
        const ticketMedioValue =
          carrosData.length > 0 ? faturamentoValue / carrosData.length : 0;
        setTicketMedio(ticketMedioValue);

        // 6. Preparar dados para os gráficos

        // Carros por tipo
        const tiposLookup = {};
        tiposData.forEach((tipo) => {
          tiposLookup[tipo.Id_TipoCarro] = tipo.Descricao;
        });

        const tiposDeCarros = carrosData.reduce((acc, carro) => {
          const tipo =
            tiposLookup[carro.FK_TipoCarro] === "particular"
              ? "Particular"
              : "Seguradora";

          if (!acc[tipo]) {
            acc[tipo] = 0;
          }

          acc[tipo]++;

          return acc;
        }, {});

        // Ticket médio por tipo de carro
        const ticketMedioPorTipo = carrosData.reduce((acc, carro) => {
          const tipo =
            tiposLookup[carro.FK_TipoCarro] === "particular"
              ? "Particular"
              : "Seguradora";

          if (!acc[tipo]) {
            acc[tipo] = { total: 0, count: 0 };
          }

          acc[tipo].total += Number(carro.ValorTotal);
          acc[tipo].count++;

          return acc;
        }, {});

        // Calcular ticket médio final por tipo
        const ticketMedioFinal = {};
        Object.keys(ticketMedioPorTipo).forEach((tipo) => {
          ticketMedioFinal[tipo] =
            ticketMedioPorTipo[tipo].total / ticketMedioPorTipo[tipo].count;
        });

        // Se não há carros, adicionar dados de exemplo
        if (Object.keys(tiposDeCarros).length === 0) {
          setCarrosPorTipo({
            "Sem dados": 1,
          });
          setTicketMedioPorTipo({
            "Sem dados": 0,
          });
        } else {
          setCarrosPorTipo(tiposDeCarros);
          setTicketMedioPorTipo(ticketMedioFinal);
        }

        // Despesas por categoria (funcionários vs outras despesas)
        setDespesasPorCategoria({
          "Salários e Adicionais": totalFuncionariosValue || 1,
          "Outras Despesas": totalDespesasValue || 1,
        });

        // Dados dos funcionários (salário base vs adicionais)
        const funcionariosDetalhes = funcionariosData.map((funcionario) => {
          const adicionais =
            adicionaisPorFuncionario[funcionario.Id_Funcionario] || [];
          const totalAdicionais = adicionais.reduce(
            (sum, adicional) => sum + Number(adicional.Valor),
            0
          );

          return {
            nome: funcionario.Nome,
            salarioBase: Number(funcionario.Salario),
            adicionais: totalAdicionais,
          };
        });
        setFuncionariosData(funcionariosDetalhes);

        // Resumo financeiro geral
        const resumoData = {
          Faturamento: faturamentoValue || 1,
          Despesas: totalDespesaValue || 1,
        };

        if (totalLucroValue > 0) {
          resumoData["Lucro"] = totalLucroValue;
        } else if (totalLucroValue < 0) {
          resumoData["Prejuízo"] = Math.abs(totalLucroValue);
        }

        setResumoFinanceiro(resumoData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [
    FuncionarioController,
    adicionaisFuncionarioController,
    carroController,
    tipoCarroController,
    despesaController,
  ]);

  return (
    <>
      <article className="Indicadores">
        <div className="ParteSuperior">
          <IndicadorSuperior
            type="numerico"
            title="Quantidade Carros"
            value={totalCarros}
            color="numerico"
          />
          <IndicadorSuperior
            type="monetario"
            title="Faturamento Total"
            value={totalFaturamento}
            color="faturamento"
          />
          <IndicadorSuperior
            type="monetario"
            title="Ticket Médio"
            value={ticketMedio}
            color="ticketMedio"
          />
          <IndicadorSuperior
            type="monetario"
            title="Despesas"
            value={totalDespesas}
            color="despesa"
          />
          <IndicadorSuperior
            type="monetario"
            title="Lucro Total"
            value={totalLucro}
            color="lucro"
          />
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-title">Dashboard Analítico</h2>

          <div className="charts-grid">
            {/* Gráfico de Resumo Financeiro */}
            <PieChart
              title="Resumo Financeiro"
              data={Object.values(resumoFinanceiro).filter(
                (value) => value > 0
              )}
              labels={Object.keys(resumoFinanceiro).filter(
                (key) => resumoFinanceiro[key] > 0
              )}
              backgroundColor={[
                "#4CAF50", // Verde para faturamento
                "#f44336", // Vermelho para despesas
                "#2196F3", // Azul para lucro
                "#FF9800", // Laranja para prejuízo
              ]}
              borderColor={["#388E3C", "#d32f2f", "#1976D2", "#F57C00"]}
            />

            {/* Gráfico de Carros por Tipo */}
            <PieChart
              title="Distribuição de Carros por Tipo"
              data={Object.values(carrosPorTipo)}
              labels={Object.keys(carrosPorTipo)}
              backgroundColor={[
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ]}
              borderColor={[
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ]}
            />

            {/* Gráfico de Ticket Médio por Tipo */}
            <PieChart
              title="Ticket Médio por Tipo de Cliente"
              data={Object.values(ticketMedioPorTipo)}
              labels={Object.keys(ticketMedioPorTipo)}
              backgroundColor={["#8E44AD", "#E74C3C"]}
              borderColor={["#6C3483", "#C0392B"]}
            />

            {/* Gráfico de Despesas por Categoria */}
            <PieChart
              title="Despesas por Categoria"
              data={Object.values(despesasPorCategoria)}
              labels={Object.keys(despesasPorCategoria)}
              backgroundColor={["#FF6B6B", "#4ECDC4"]}
              borderColor={["#FF5252", "#26A69A"]}
            />

            {/* Gráfico de Funcionários (Salário Base vs Adicionais) */}
            {funcionariosData.length > 0 && (
              <PieChart
                title="Distribuição Salarial Total"
                data={[
                  funcionariosData.reduce(
                    (sum, func) => sum + func.salarioBase,
                    0
                  ),
                  funcionariosData.reduce(
                    (sum, func) => sum + func.adicionais,
                    0
                  ),
                ]}
                labels={["Salários Base", "Adicionais"]}
                backgroundColor={["#8BC34A", "#FFC107"]}
                borderColor={["#689F38", "#FFA000"]}
              />
            )}
          </div>
        </div>
      </article>
    </>
  );
}
