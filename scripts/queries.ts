import { PerChainQueryRequest, QueryProxyMock, QueryRequest, QueryResponse, SolanaPdaQueryRequest, SolanaPdaQueryResponse } from "@wormhole-foundation/wormhole-query-sdk"
import { Program } from "@coral-xyz/anchor";
import IDL from "../program/market.json";
import { ForecastMarket } from "../program/market";
import { clusterApiUrl, Connection } from "@solana/web3.js";


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const forecastMarketProgram = new Program(IDL as ForecastMarket, {
    connection: connection,
});
const marketKey = Buffer.alloc(8);
marketKey.writeBigUInt64LE(1n);
const marketSeed = Buffer.from("market", 'utf-8');
const configSeed = Buffer.from("config", 'utf-8');
// const seeds = [marketSeed, marketKey];
const seeds = [configSeed];


const main = async () => {
    const mock = new QueryProxyMock({
        1: clusterApiUrl("devnet"),
    });

    const query = new QueryRequest(42, [
        new PerChainQueryRequest(
          1,
          new SolanaPdaQueryRequest("finalized", [
            {
              programAddress: forecastMarketProgram.programId.toBytes(),
              seeds: seeds.map((seed) => seed),
            },
          ])
        ),
      ]);
      
    const resp = await mock.mock(query);
    
    const queryResponse = QueryResponse.from(Buffer.from(resp.bytes, "hex"));
    const solResponse = queryResponse.responses[0].response as SolanaPdaQueryResponse;
    console.log('PDA Data', solResponse.results[0].data);
}

main();