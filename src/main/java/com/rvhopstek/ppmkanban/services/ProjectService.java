package com.rvhopstek.ppmkanban.services;

import com.rvhopstek.ppmkanban.domain.Project;
import com.rvhopstek.ppmkanban.exceptions.ProjectIdException;
import com.rvhopstek.ppmkanban.repositories.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;

  public Project saveOrUpdate(Project project) {
    try {
      project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
      return projectRepository.save(project);
    } catch (Exception e) {
      throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
    }
  }

  public Project findProjectByIdentifier(String projectId) {
    Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
    if (project == null) {
      throw new ProjectIdException("Project ID '" + projectId.toUpperCase() + "' doesn't exists");
    }
    return project;
  }

  public Iterable<Project> findAllProjects() {
    return projectRepository.findAll();
  }

  public void deleteProjectByIdentifier(String projectId) {
    Project project = this.findProjectByIdentifier(projectId);
    projectRepository.delete(project);
  }
}
