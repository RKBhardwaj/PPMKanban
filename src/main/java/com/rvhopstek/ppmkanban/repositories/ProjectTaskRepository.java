package com.rvhopstek.ppmkanban.repositories;

import java.util.List;

import com.rvhopstek.ppmkanban.domain.ProjectTask;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
  ProjectTask findByProjectIdentifier(String identifier);

  List<ProjectTask> findByProjectIdentifierOrderByPriority(String id);

  ProjectTask findByProjectSequence(String project_task_id);
}
