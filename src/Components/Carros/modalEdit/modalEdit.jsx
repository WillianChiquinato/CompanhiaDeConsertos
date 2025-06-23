export default function ModalEditCarros({
  isOpen,
  onClose,
  tipo,
  onUpdateCarro,
  carroData,
}) {
  const [formData, setFormData] = useState(carroData);

  useEffect(() => {
    setFormData(carroData);
  }, [carroData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tipoId = tipo === "particular" ? 1 : 2;

    const carroAtualizado = {
      ...formData,
      FK_TipoCarro: tipoId,
      ValorTotal: parseFloat(formData.ValorTotal),
      Imagem: formData.imagem ? formData.imagem.name : "",
      updatedAt: new Date().toISOString(),
    };

    try {
      await onUpdateCarro(carroAtualizado);
      onClose();
      setFormData(carroData);
    } catch (error) {
      console.error("Erro ao atualizar o carro:", error);
    }
  };

  return <div className={`modal ${isOpen ? "open" : ""}`} />;
}
