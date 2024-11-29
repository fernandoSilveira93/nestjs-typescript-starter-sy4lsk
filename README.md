# Kraken Trading Bot API

## Descrição
API para automatização de trading na exchange Kraken, desenvolvida com NestJS e integrada com Firebase para persistência de dados.

## Configuração do Projeto

```bash
# Instalação de dependências
$ npm install

# Executar em desenvolvimento
$ npm run start:dev

# Executar em produção
$ npm run start:prod
```

## Documentação da API

A documentação completa da API está disponível em `/api` utilizando Swagger UI.

### Endpoints Principais

#### Autenticação (/auth)

##### POST /auth/validate-keys
Valida as chaves da API Kraken.
- **Headers**:
  - `user-id`: ID do usuário no Firebase
- **Body**:
  ```json
  {
    "apiKey": "sua-api-key",
    "apiSecret": "seu-api-secret"
  }
  ```

#### Kraken (/kraken)

##### GET /kraken/balance
Obtém o saldo da conta.
- **Headers**:
  - `user-id`: ID do usuário no Firebase
- **Resposta**:
  ```json
  {
    "XXBT": "0.1234",
    "ZUSD": "1000.00"
  }
  ```

##### GET /kraken/recent-trades
Lista trades recentes.
- **Headers**:
  - `user-id`: ID do usuário no Firebase
- **Resposta**:
  ```json
  {
    "pair": "XXBTZUSD",
    "price": "50000.00",
    "volume": "0.1000",
    "type": "buy",
    "time": 1635724800
  }
  ```

#### Bot (/bot)

##### POST /bot/start
Inicia o bot de trading.
- **Body**:
  ```json
  {
    "pair": "BTCUSD",
    "amount": 100,
    "interval": 1440
  }
  ```
- **Campos**:
  - `pair`: Par de trading (ex: BTCUSD)
  - `amount`: Valor a ser investido por intervalo
  - `interval`: Intervalo em minutos entre operações

##### GET /bot/status
Verifica o status do bot.
- **Resposta**:
  ```json
  {
    "status": "running",
    "lastTrade": {
      "timestamp": "2024-03-29T10:00:00Z",
      "pair": "BTCUSD",
      "amount": 0.001,
      "price": 50000
    }
  }
  ```

### Estrutura de Dados

#### Trade
```typescript
{
  id?: string;
  userId: string;
  pair: string;
  amount: number;
  price: number;
  type: 'buy' | 'sell';
  profit?: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}
```

### WebSocket

O sistema possui integração com WebSocket para atualizações em tempo real:
- `tradeUpdate`: Recebe atualizações de trades
- `botStatus`: Recebe atualizações do status do bot

### Segurança

- Autenticação via Firebase
- Validação de API keys da Kraken
- CORS habilitado para integração com frontend
- Todas as requisições privadas requerem header `user-id`

### Persistência

Todos os dados são armazenados no Firebase Realtime Database:
- Credenciais da API
- Histórico de trades
- Configurações do bot
- Snapshots de saldo

## Suporte

Para suporte ou dúvidas, abra uma issue no repositório.

## Licença

[MIT licensed](LICENSE)