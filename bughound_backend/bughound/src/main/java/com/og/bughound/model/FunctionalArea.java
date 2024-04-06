package com.og.bughound.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Functional_Area\"")
public class FunctionalArea {

    @Id
    @Column(name = "\"Functional_Area_ID\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long functionalAreaId;

    @Column(name = "\"Area_Name\"", length = 100)
    private String areaName;

    public FunctionalArea() {
    }

    public FunctionalArea(Long functionalAreaId, String areaName) {
        this.functionalAreaId = functionalAreaId;
        this.areaName = areaName;
    }

    public Long getFunctionalAreaId() {
        return this.functionalAreaId;
    }

    public void setFunctionalAreaId(Long functionalAreaId) {
        this.functionalAreaId = functionalAreaId;
    }

    public String getAreaName() {
        return this.areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    @Override
    public String toString() {
        return "{" +
                " functionalAreaId='" + getFunctionalAreaId() + "'" +
                ", areaName='" + getAreaName() + "'" +
                "}";
    }

}
