package com.rvhopstek.ppmkanban.services;

import com.rvhopstek.ppmkanban.domain.Backlog;
import com.rvhopstek.ppmkanban.domain.Project;
import com.rvhopstek.ppmkanban.exceptions.ProjectIdException;
import com.rvhopstek.ppmkanban.repositories.BacklogRepository;
import com.rvhopstek.ppmkanban.repositories.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;
  @Autowired
  private BacklogRepository backlogRepository;

  public Project saveOrUpdate(Project project) {
    String projectIdentifier = project.getProjectIdentifier().toUpperCase();
    try {
      project.setProjectIdentifier(projectIdentifier);
      if (project.getId() == null) {
        Backlog backlog = new Backlog();
        project.setBacklog(backlog);
        backlog.setProject(project);
        backlog.setProjectIdentifier(projectIdentifier);
      }
      if (project.getId() != null) {
        project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
      }
      return projectRepository.save(project);
    } catch (Exception e) {
      throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists");
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
