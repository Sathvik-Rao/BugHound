package com.og.bughound.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.og.bughound.model.Program;
import com.og.bughound.repo.ProgramRepo;

import jakarta.transaction.Transactional;

@Service
public class ProgramService {

    private final ProgramRepo programRepo;

    public ProgramService(ProgramRepo programRepo) {
        this.programRepo = programRepo;
    }

    public Program getProgram(String programName) {

        if (isValidProgramName(programName)) {
            programName = programName.trim();
            return programRepo.findByProgramName(programName);
        }
        return null;
    }

    public Program getProgramById(Long programId) {

        return programId == null ? null : programRepo.findById(programId).orElse(null);
    }

    public void deleteProgram(Long programId) {
        if (programId == null) {
            return;
        }
        programRepo.deleteById(programId);
    }

    public List<Program> startsWithProgramName(String query) {
        return query == null ? null
                : programRepo.findByProgramNameIgnoreCaseStartingWith(query);
    }

    @Transactional
    public Program saveProgram(String programName) {
        return saveProgram(programName, null);
    }

    @Transactional
    public Program saveProgram(String programName, Long programId) {

        if (isValidProgramName(programName)) {
            programName = programName.trim();
            Program program = programId != null
                    ? programRepo.findById(programId).orElseGet(Program::new)
                    : new Program();

            if (programRepo.findByProgramName(programName) == null) {
                program.setProgramName(programName);
                return programRepo.save(program);
            }
        }
        return null;
    }

    private boolean isValidProgramName(String programName) {
        return programName != null && !programName.trim().isEmpty();
    }
}
