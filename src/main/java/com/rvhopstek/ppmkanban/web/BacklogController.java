package com.rvhopstek.ppmkanban.web;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rvhopstek.ppmkanban.domain.ProjectTask;
import com.rvhopstek.ppmkanban.services.MapValidationErrorService;
import com.rvhopstek.ppmkanban.services.ProjectTaskService;

import org.apache.coyote.Request;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

  @Autowired
  private ProjectTaskService projectTaskService;

  @Autowired
  private MapValidationErrorService mapValidationErrorService;

  @PostMapping("/{backlog_id}")
  public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult, @PathVariable String backlog_id) {
    ResponseEntity<?> errorMap = mapValidationErrorService.getErrorMap(bindingResult);
    if (errorMap != null) {
      return errorMap;
    }
    ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask);
    return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);

  }

  @GetMapping("/{backlog_id}")
  public Iterable<ProjectTask> getBacklogById(@PathVariable String backlog_id) {
    return projectTaskService.getBacklogById(backlog_id);
  }

  @GetMapping("/{backlog_id}/{project_task_id}")
  public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String project_task_id) {
    ProjectTask projectTask = projectTaskService.findByProjectSequence(backlog_id, project_task_id);
    return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
  }

  @PatchMapping("/{backlog_id}/{project_task_id}")
  public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult, @PathVariable String backlog_id, @PathVariable String project_task_id) {
    ResponseEntity<?> errorMap = mapValidationErrorService.getErrorMap(bindingResult);
    if (errorMap != null) {
      return errorMap;
    }
    ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlog_id, project_task_id);
    return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
  }

  @DeleteMapping("/{backlog_id}/{project_task_id}")
  public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String project_task_id) {
    projectTaskService.deleteByProjectSequence(backlog_id, project_task_id);
    Map<String, String> successMap = new HashMap<>();
    successMap.put("message", "Project Task with id '" + project_task_id + "' deleted successfully.");
    return new ResponseEntity<Map<String, String>>(successMap, HttpStatus.OK);
  }
}
