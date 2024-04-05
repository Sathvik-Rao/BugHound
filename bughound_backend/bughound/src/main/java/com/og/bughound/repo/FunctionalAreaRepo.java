package com.og.bughound.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.og.bughound.model.FunctionalArea;

public interface FunctionalAreaRepo extends JpaRepository<FunctionalArea, Long> {
    FunctionalArea findByAreaName(String functionalAreaName);

    List<FunctionalArea> findByAreaNameIgnoreCaseStartingWith(String areaName);
}
