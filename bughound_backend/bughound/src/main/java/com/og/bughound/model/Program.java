package com.og.bughound.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Program\"")
public class Program {

    @Id
    @Column(name = "\"Program_ID\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    @Column(name = "\"Program_Name\"", length = 100)
    private String programName;

    public Program() {
    }

    public Program(Long programId, String programName) {
        this.programId = programId;
        this.programName = programName;
    }

    public Long getProgramId() {
        return this.programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

    public String getProgramName() {
        return this.programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    @Override
    public String toString() {
        return "{" +
                " programId='" + getProgramId() + "'" +
                ", programName='" + getProgramName() + "'" +
                "}";
    }

}
