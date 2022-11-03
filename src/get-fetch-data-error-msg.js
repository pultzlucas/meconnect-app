import * as Network from 'expo-network';

export default async function getFetchDataErrorMessage() {
    const { isConnected } = await Network.getNetworkStateAsync()
    return isConnected 
    ? 'Erro interno ao buscar os dados. Tente novamente mais tarde'
    : 'Sem conexão com a internet'
}