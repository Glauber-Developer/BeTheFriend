package com.bethefriend.bethefriend.infrastructure.config;

import com.bethefriend.bethefriend.domain.user.User;
import com.bethefriend.bethefriend.domain.user.UserType;
import com.bethefriend.bethefriend.infrastructure.repositories.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Configuration
public class DataLoaderConfig {

    @Bean
    CommandLineRunner loadData(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                List<User> users = List.of(
                    new User("Ana Silva", "ana.silva@example.com", passwordEncoder.encode("123456"), "São Paulo", "SP", "Brasil", List.of("Tecnologia", "Leitura"), UserType.SENIOR),
                    new User("Bruno Souza", "bruno.souza@example.com", passwordEncoder.encode("123456"), "Rio de Janeiro", "RJ", "Brasil", List.of("Esporte", "Filmes"), UserType.VOLUNTARIO),
                    new User("Carla Mendes", "carla.mendes@example.com", passwordEncoder.encode("123456"), "Belo Horizonte", "MG", "Brasil", List.of("Culinária", "Jardinagem"), UserType.SENIOR),
                    new User("Diego Costa", "diego.costa@example.com", passwordEncoder.encode("123456"), "Porto Alegre", "RS", "Brasil", List.of("Jogos", "Tecnologia"), UserType.VOLUNTARIO),
                    new User("Elisa Ramos", "elisa.ramos@example.com", passwordEncoder.encode("123456"), "Recife", "PE", "Brasil", List.of("Futebol", "Leitura"), UserType.SENIOR),
                    new User("Fernanda Lima", "fernanda.lima@example.com", passwordEncoder.encode("123456"), "Salvador", "BA", "Brasil", List.of("Filmes", "Novelas"), UserType.VOLUNTARIO),
                    new User("Gabriel Rocha", "gabriel.rocha@example.com", passwordEncoder.encode("123456"), "Curitiba", "PR", "Brasil", List.of("Bate-papo", "Passeio"), UserType.SENIOR),
                    new User("Helena Martins", "helena.martins@example.com", passwordEncoder.encode("123456"), "Florianópolis", "SC", "Brasil", List.of("Artesanatos", "Culinária"), UserType.VOLUNTARIO),
                    new User("Igor Ferreira", "igor.ferreira@example.com", passwordEncoder.encode("123456"), "Manaus", "AM", "Brasil", List.of("Futebol", "Esporte"), UserType.SENIOR),
                    new User("Joana Oliveira", "joana.oliveira@example.com", passwordEncoder.encode("123456"), "Goiânia", "GO", "Brasil", List.of("Leitura", "Filmes"), UserType.VOLUNTARIO),
                    new User("Lucas Almeida", "lucas.almeida@example.com", passwordEncoder.encode("123456"), "São Luís", "MA", "Brasil", List.of("Tecnologia", "Jogos"), UserType.SENIOR),
                    new User("Mariana Ribeiro", "mariana.ribeiro@example.com", passwordEncoder.encode("123456"), "Teresina", "PI", "Brasil", List.of("Jardinagem", "Culinária"), UserType.VOLUNTARIO),
                    new User("Nicolas Santos", "nicolas.santos@example.com", passwordEncoder.encode("123456"), "Natal", "RN", "Brasil", List.of("Passeio", "Esporte"), UserType.SENIOR),
                    new User("Olivia Nunes", "olivia.nunes@example.com", passwordEncoder.encode("123456"), "Campo Grande", "MS", "Brasil", List.of("Bate-papo", "Tecnologia"), UserType.VOLUNTARIO),
                    new User("Paulo Henrique", "paulo.henrique@example.com", passwordEncoder.encode("123456"), "Fortaleza", "CE", "Brasil", List.of("Futebol", "Leitura"), UserType.SENIOR),
                    new User("Queila Cardoso", "queila.cardoso@example.com", passwordEncoder.encode("123456"), "Vitória", "ES", "Brasil", List.of("Filmes", "Novelas"), UserType.VOLUNTARIO),
                    new User("Rafael Xavier", "rafael.xavier@example.com", passwordEncoder.encode("123456"), "João Pessoa", "PB", "Brasil", List.of("Jogos", "Passeio"), UserType.SENIOR),
                    new User("Sabrina Luz", "sabrina.luz@example.com", passwordEncoder.encode("123456"), "Aracaju", "SE", "Brasil", List.of("Culinária", "Tecnologia"), UserType.VOLUNTARIO),
                    new User("Tiago Cunha", "tiago.cunha@example.com", passwordEncoder.encode("123456"), "Belém", "PA", "Brasil", List.of("Esporte", "Bate-papo"), UserType.SENIOR),
                    new User("Ursula Prado", "ursula.prado@example.com", passwordEncoder.encode("123456"), "Boa Vista", "RR", "Brasil", List.of("Jardinagem", "Artesanatos"), UserType.VOLUNTARIO),
                    new User("Vanessa Costa", "vanessa.costa@example.com", passwordEncoder.encode("123456"), "Maceió", "AL", "Brasil", List.of("Passeio", "Filmes"), UserType.SENIOR),
                    new User("William Torres", "william.torres@example.com", passwordEncoder.encode("123456"), "Palmas", "TO", "Brasil", List.of("Futebol", "Jogos"), UserType.VOLUNTARIO),
                    new User("Xavier Lima", "xavier.lima@example.com", passwordEncoder.encode("123456"), "Porto Velho", "RO", "Brasil", List.of("Tecnologia", "Artesanatos"), UserType.SENIOR),
                    new User("Yasmin Duarte", "yasmin.duarte@example.com", passwordEncoder.encode("123456"), "Macapá", "AP", "Brasil", List.of("Leitura", "Bate-papo"), UserType.VOLUNTARIO),
                    new User("Zilda Souza", "zilda.souza@example.com", passwordEncoder.encode("123456"), "Rio Branco", "AC", "Brasil", List.of("Filmes", "Culinária"), UserType.SENIOR),
                    new User("Arthur Mendes", "arthur.mendes@example.com", passwordEncoder.encode("123456"), "São Paulo", "SP", "Brasil", List.of("Tecnologia", "Jogos"), UserType.VOLUNTARIO),
                    new User("Beatriz Rocha", "beatriz.rocha@example.com", passwordEncoder.encode("123456"), "Rio de Janeiro", "RJ", "Brasil", List.of("Leitura", "Novelas"), UserType.SENIOR),
                    new User("César Costa", "cesar.costa@example.com", passwordEncoder.encode("123456"), "Curitiba", "PR", "Brasil", List.of("Futebol", "Passeio"), UserType.VOLUNTARIO),
                    new User("Daniela Ramos", "daniela.ramos@example.com", passwordEncoder.encode("123456"), "Recife", "PE", "Brasil", List.of("Artesanatos", "Esporte"), UserType.SENIOR)
                );

                userRepository.saveAll(users);
                System.out.println("Usuários iniciais carregados no banco de dados com senha criptografada.");
            }
        };
    }
}
