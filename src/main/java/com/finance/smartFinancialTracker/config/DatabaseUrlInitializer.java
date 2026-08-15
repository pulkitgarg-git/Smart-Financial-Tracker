package com.finance.smartFinancialTracker.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * Converts a Heroku/Render-style {@code DATABASE_URL}
 * ({@code postgres://user:pass@host:port/db}) into Spring JDBC properties.
 */
public class DatabaseUrlInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        String raw = System.getenv("DATABASE_URL");
        if (raw == null || raw.isBlank() || raw.startsWith("jdbc:")) {
            return;
        }

        try {
            String normalized = raw.replaceFirst("^postgres(ql)?://", "http://");
            URI uri = URI.create(normalized);
            String userInfo = uri.getUserInfo();
            if (userInfo == null || !userInfo.contains(":")) {
                return;
            }
            int colon = userInfo.indexOf(':');
            String user = userInfo.substring(0, colon);
            String password = userInfo.substring(colon + 1);
            int port = uri.getPort() == -1 ? 5432 : uri.getPort();
            String query = uri.getQuery();
            String jdbc = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath()
                    + (query == null || query.isBlank() ? "?sslmode=require" : "?" + query);

            Map<String, Object> props = new HashMap<>();
            props.put("spring.datasource.url", jdbc);
            props.put("spring.datasource.username", user);
            props.put("spring.datasource.password", password);
            applicationContext.getEnvironment().getPropertySources()
                    .addFirst(new MapPropertySource("databaseUrl", props));
        } catch (Exception ignored) {
            // Fall back to SPRING_DATASOURCE_* properties.
        }
    }
}
