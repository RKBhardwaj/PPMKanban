package com.rvhopstek.ppmkanban.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Backlog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private Integer PTSequence = 0;
  private String projectIdentifier;

  //OneToOne with project
  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinColumn(name = "project_id", nullable = false)
  @JsonIgnore
  private Project project;

  //OneToMany projectTasks
  @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "backlog", orphanRemoval = true)
  private List<ProjectTask> projectTaskList = new ArrayList<>();

  public Backlog() {  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Integer getPTSequence() {
    return PTSequence;
  }

  public void setPTSequence(Integer PTSequence) {
    this.PTSequence = PTSequence;
  }

  public String getProjectIdentifier() {
    return projectIdentifier;
  }

  public void setProjectIdentifier(String projectIdentifier) {
    this.projectIdentifier = projectIdentifier;
  }

  public Project getProject() {
    return project;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  public List<ProjectTask> getProjectTaskList() {
    return projectTaskList;
  }

  public void setProjectTaskList(List<ProjectTask> projectTaskList) {
    this.projectTaskList = projectTaskList;
  }

  @Override
  public String toString() {
    return "Backlog{" +
        "id=" + id +
        ", PTSequence=" + PTSequence +
        ", projectIdentifier='" + projectIdentifier + '\'' +
        ", project=" + project +
        ", projectTaskList=" + projectTaskList +
        '}';
  }
}
