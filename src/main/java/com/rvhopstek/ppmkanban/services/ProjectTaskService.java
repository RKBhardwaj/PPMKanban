package com.rvhopstek.ppmkanban.services;


import java.util.List;
import java.util.Objects;

import com.rvhopstek.ppmkanban.domain.Backlog;
import com.rvhopstek.ppmkanban.domain.Project;
import com.rvhopstek.ppmkanban.domain.ProjectTask;
import com.rvhopstek.ppmkanban.exceptions.ProjectNotFoundException;
import com.rvhopstek.ppmkanban.repositories.BacklogRepository;
import com.rvhopstek.ppmkanban.repositories.ProjectRepository;
import com.rvhopstek.ppmkanban.repositories.ProjectTaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {
  @Autowired
  private BacklogRepository backlogRepository;
  @Autowired
  private ProjectTaskRepository projectTaskRepository;
  @Autowired
  private ProjectRepository projectRepository;


  public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
    try {
      //Project task to be added to specific, project !=null, Backlog exists
      Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
      projectTask.setBacklog(backlog);

      //Project sequence
      Integer backlogSequence = backlog.getPTSequence();
      backlogSequence++;
      backlog.setPTSequence(backlogSequence);

      //Add sequence to project task
      projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
      projectTask.setProjectIdentifier(projectIdentifier);

      if (projectTask.getPriority() == 0 || projectTask.getPriority() == null) {
        projectTask.setPriority(3);
      }
      if (Objects.equals(projectTask.getStatus(), "") || projectTask.getStatus()==null) {
        projectTask.setStatus("TODO");
      }
      return projectTaskRepository.save(projectTask);
    } catch (Exception ex) {
      throw new ProjectNotFoundException("Project with Id '" + projectIdentifier + "' doesn\'t exist");
    }
  }

  public Iterable<ProjectTask> getBacklogById(String backlog_id) {
    Project project = projectRepository.findByProjectIdentifier(backlog_id);
    if (project == null) {
      throw new ProjectNotFoundException("Project with Id '" + backlog_id + "' doesn\'t exist");
    }
    return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
  }
}
