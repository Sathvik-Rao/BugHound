package com.og.bughound.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.og.bughound.model.Program;

public interface ProgramRepo extends JpaRepository<Program, Long> {

    Program findByProgramName(String programName);

    List<Program> findByProgramNameIgnoreCaseStartingWith(String programName);
}
