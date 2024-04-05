package com.og.bughound.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.og.bughound.model.Team;
import com.og.bughound.repo.TeamRepo;

import jakarta.transaction.Transactional;

@Service
public class TeamService {
    private final TeamRepo teamRepo;

    public TeamService(TeamRepo teamRepo) {
        this.teamRepo = teamRepo;
    }

    public Team getTeam(String teamName) {

        if (isValidTeamName(teamName)) {
            teamName = teamName.trim();
            return teamRepo.findByTeamName(teamName);
        }
        return null;
    }

    public Team getTeamById(Long teamId) {

        return teamId == null ? null : teamRepo.findById(teamId).orElse(null);
    }

    @Transactional
    public void deleteTeam(Long teamId) {
        if (teamId == null) {
            return;
        }
        teamRepo.deleteById(teamId);
    }

    public List<Team> startsWithTeamName(String query) {

        return query == null ? null
                : teamRepo.findByTeamNameIgnoreCaseStartingWith(query);
    }

    @Transactional
    public Team saveTeam(String teamName) {
        return saveTeam(teamName, null);
    }

    @Transactional
    public Team saveTeam(String teamName, Long teamId) {

        if (isValidTeamName(teamName)) {
            teamName = teamName.trim();
            Team team = teamId != null
                    ? teamRepo.findById(teamId).orElseGet(Team::new)
                    : new Team();

            if (teamRepo.findByTeamName(teamName) == null) {
                team.setTeamName(teamName);
                return teamRepo.save(team);
            }
        }
        return null;
    }

    private boolean isValidTeamName(String teamName) {
        return teamName != null && !teamName.trim().isEmpty();
    }
}
