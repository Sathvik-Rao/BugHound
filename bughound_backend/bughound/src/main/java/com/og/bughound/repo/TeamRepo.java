package com.og.bughound.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.og.bughound.model.Team;

public interface TeamRepo extends JpaRepository<Team, Long> {
    Team findByTeamName(String teamName);

    List<Team> findByTeamNameIgnoreCaseStartingWith(String teamName);
}
