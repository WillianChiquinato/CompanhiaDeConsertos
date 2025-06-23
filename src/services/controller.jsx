import ApiService from '../services/service';

/**
 * Hook genérico para operações CRUD em uma entidade da API.
 * @param {string} entityName
 */
const useApiController = (entityName) => {
  if (!entityName || typeof entityName !== 'string') {
    throw new Error('entityName deve ser uma string não vazia em useApiController.');
  }

  const getAll = async () => {
    try {
      return await ApiService.get(entityName);
    } catch (error) {
      console.error(`Erro ao buscar todos os ${entityName}:`, error);
      throw error;
    }
  };

  const getOne = async (id) => {
    if (!id) throw new Error('ID é obrigatório para buscar um registro específico.');
    try {
      return await ApiService.get(`${entityName}/${id}`);
    } catch (error) {
      console.error(`Erro ao buscar ${entityName} com ID ${id}:`, error);
      throw error;
    }
  };

  const create = async (data) => {
    if (!data) throw new Error('Dados são obrigatórios para criar um registro.');
    try {
      return await ApiService.post(entityName, data);
    } catch (error) {
      console.error(`Erro ao criar ${entityName}:`, error);
      throw error;
    }
  };

  const update = async (id, data) => {
    if (!id) throw new Error('ID é obrigatório para atualizar um registro.');
    if (!data) throw new Error('Dados são obrigatórios para atualizar um registro.');
    try {
      return await ApiService.put(`${entityName}/${id}`, data);
    } catch (error) {
      console.error(`Erro ao atualizar ${entityName} com ID ${id}:`, error);
      throw error;
    }
  };

  //Funcao do DELETE
  const deleteRecord = async (id) => {
    if (!id) throw new Error('ID é obrigatório para deletar um registro.');
    try {
      return await ApiService.delete(`${entityName}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar ${entityName} com ID ${id}:`, error);
      throw error;
    }
  };

  return {
    getAll,
    getOne,
    create,
    update,
    deleteRecord,
  };
};

export default useApiController;