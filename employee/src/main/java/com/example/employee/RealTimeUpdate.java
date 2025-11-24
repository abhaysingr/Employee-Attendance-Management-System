package com.example.employee;

public class RealTimeUpdate {
    private String eid;
    private String ename;
    private String timestamp;
    private String status;

    public RealTimeUpdate(String eid, String ename, String timestamp, String status) {
        this.eid = eid;
        this.ename = ename;
        this.timestamp = timestamp;
        this.status = status;
    }

    // Getters and setters
    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }
}
