package com.rvhopstek.ppmkanban.exceptions;

public class ProjectNotFoundExceptionResponse {
  private String projectNotFoundException;

  public ProjectNotFoundExceptionResponse(String projectNotFoundException) {
    this.projectNotFoundException = projectNotFoundException;
  }

  public String getProjectNotFoundException() {
    return projectNotFoundException;
  }

  public void setProjectNotFoundException(String projectNotFoundException) {
    this.projectNotFoundException = projectNotFoundException;
  }
}
