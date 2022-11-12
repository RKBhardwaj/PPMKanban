package com.rvhopstek.ppmkanban.web;

import javax.validation.Valid;

import java.util.List;

import com.rvhopstek.ppmkanban.domain.ProjectTask;
import com.rvhopstek.ppmkanban.services.MapValidationErrorService;
import com.rvhopstek.ppmkanban.services.ProjectTaskService;

import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
