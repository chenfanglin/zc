package com.zc.httpclient;

import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.config.RequestConfig.Builder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.IdleConnectionEvictor;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

/**
 * @Description:httpclient连接池配置类
 */
@Repository
public class HttpConfig {

    //连接总数
    private static final Integer MAX_TOTAL = 50;

    //每个主机最大的并发数
    private static final Integer DEFAULT_MAX_PER_ROUTE = 20;

    //创建连接的最长时间
    private static final Integer CONNECT_TIMEOUT = 2000;

    //从连接池中获取到连接的最长时间
    private static final Integer CONNECTION_REQUEST_TIMEOUT = 500;

    //数据传输的最长时间
    private static final Integer SOCKET_TIMEOUT = 3000;

    //空闲时间(用于定期清理空闲连接)
    private static final Long MAX_IDLE_TIME = 5l;

    @Bean(name = "connectionManager", destroyMethod = "close")
    public PoolingHttpClientConnectionManager connectionManager() {

        PoolingHttpClientConnectionManager pooltccm =
                 new PoolingHttpClientConnectionManager();
        pooltccm.setMaxTotal(MAX_TOTAL);
        pooltccm.setDefaultMaxPerRoute(DEFAULT_MAX_PER_ROUTE);
        return pooltccm;
    }

    @Bean(name = "httpClientBuilder")
    public HttpClientBuilder httpClientBuilder(){
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
        httpClientBuilder.setConnectionManager(connectionManager());
        return httpClientBuilder;
    }

    @Bean(name = "httpClient")
    @Scope("prototype")
    public CloseableHttpClient httpClient(){
        return httpClientBuilder().build();
    }

    @Bean(name ="requestConfigBuilder")
    public Builder requestConfigBuilder(){
        Builder builder = RequestConfig.custom();
        builder.setConnectTimeout(CONNECT_TIMEOUT);
        builder.setConnectionRequestTimeout(CONNECTION_REQUEST_TIMEOUT);
        builder.setSocketTimeout(SOCKET_TIMEOUT);
        return builder;
    }

    @Bean(name = "requestConfig")
    public RequestConfig requestConfig(){
        return requestConfigBuilder().build();
    }

    @Bean(name = "httpclientPoolingCycleClear",destroyMethod="shutdown")
    public IdleConnectionEvictor idleConnectionEvictor(){
        IdleConnectionEvictor idleConnectionEvictor =
                new IdleConnectionEvictor(connectionManager(),MAX_IDLE_TIME, TimeUnit.MINUTES);
        return idleConnectionEvictor;
    }
}
