package com.og.bughound.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.og.bughound.model.FunctionalArea;
import com.og.bughound.repo.FunctionalAreaRepo;

import jakarta.transaction.Transactional;

@Service
public class FunctionalAreaService {
    private final FunctionalAreaRepo functionalAreaRepo;

    public FunctionalAreaService(FunctionalAreaRepo functionalAreaRepo) {
        this.functionalAreaRepo = functionalAreaRepo;
    }

    public FunctionalArea getFunctionalArea(String functionalAreaName) {

        if (isValidFunctionalAreaName(functionalAreaName)) {
            functionalAreaName = functionalAreaName.trim();
            return functionalAreaRepo.findByAreaName(functionalAreaName);
        }
        return null;
    }

    public FunctionalArea getFunctionalAreaById(Long functionalAreaId) {

        return functionalAreaId == null ? null : functionalAreaRepo.findById(functionalAreaId).orElse(null);
    }

    @Transactional
    public void deleteFunctionalArea(Long functionalAreaId) {
        if (functionalAreaId == null) {
            return;
        }
        functionalAreaRepo.deleteById(functionalAreaId);
    }

    public List<FunctionalArea> startsWithFunctionalAreaName(String query) {
        return query == null ? null
                : functionalAreaRepo.findByAreaNameIgnoreCaseStartingWith(query);
    }

    @Transactional
    public FunctionalArea saveFunctionalArea(String functionalAreaName) {
        return saveFunctionalArea(functionalAreaName, null);
    }

    @Transactional
    public FunctionalArea saveFunctionalArea(String functionalAreaName, Long functionalAreaId) {

        if (isValidFunctionalAreaName(functionalAreaName)) {
            functionalAreaName = functionalAreaName.trim();
            FunctionalArea functionalArea = functionalAreaId != null
                    ? functionalAreaRepo.findById(functionalAreaId).orElseGet(FunctionalArea::new)
                    : new FunctionalArea();

            if (functionalAreaRepo.findByAreaName(functionalAreaName) == null) {
                functionalArea.setAreaName(functionalAreaName);
                return functionalAreaRepo.save(functionalArea);
            }
        }
        return null;
    }

    private boolean isValidFunctionalAreaName(String functionalAreaName) {
        return functionalAreaName != null && !functionalAreaName.trim().isEmpty();
    }
}
