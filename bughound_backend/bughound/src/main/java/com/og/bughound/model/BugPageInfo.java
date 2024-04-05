package com.og.bughound.model;

import java.util.List;

public class BugPageInfo {
    private List<BugForm> bugs;
    private long totalCount;

    public BugPageInfo() {
    }

    public BugPageInfo(List<BugForm> bugs, long totalCount) {
        this.bugs = bugs;
        this.totalCount = totalCount;
    }

    public List<BugForm> getBugs() {
        return this.bugs;
    }

    public void setBugs(List<BugForm> bugs) {
        this.bugs = bugs;
    }

    public long getTotalCount() {
        return this.totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    @Override
    public String toString() {
        return "{" +
                " bugs='" + getBugs() + "'" +
                ", totalCount='" + getTotalCount() + "'" +
                "}";
    }

}
