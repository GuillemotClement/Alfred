package api.alfredapi.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration 
public class SecurityConfig {
  @Bean 
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
      .authorizeHttpRequests(auth -> auth
          // autorise les requete sur le endpoint
          .requestMatchers(HttpMethod.GET, "/api/check-health").permitAll()
          // refuse sur les autres
          .anyRequest().authenticated()
      )
      // désactive le formulaire et sa page par défaut
      .formLogin(form -> form.disable())
      .httpBasic(basic -> basic.disable())
      .build();
  }
}
