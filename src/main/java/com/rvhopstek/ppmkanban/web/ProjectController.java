package com.rvhopstek.ppmkanban.web;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rvhopstek.ppmkanban.domain.Project;
import com.rvhopstek.ppmkanban.services.MapValidationErrorService;
import com.rvhopstek.ppmkanban.services.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

  @Autowired
  private ProjectService projectService;
  @Autowired
  private MapValidationErrorService mapValidationErrorService;

  @PostMapping("")
  public ResponseEntity<?> createUpdateProject(@Valid @RequestBody Project project, BindingResult result) {
    ResponseEntity<?> errorMap = mapValidationErrorService.getErrorMap(result);
    if (errorMap != null) {
      return errorMap;
    }
    Project project1 = projectService.saveOrUpdate(project);
    return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
  }

  @GetMapping("/{projectId}")
  public ResponseEntity<?> getProjectById(@PathVariable String projectId) {
    Project project = projectService.findProjectByIdentifier(projectId);
    return new ResponseEntity<Project>(project, HttpStatus.OK);
  }

  @GetMapping("")
  public ResponseEntity<?> getAllProjects() {
    Iterable<Project> projects = projectService.findAllProjects();
    return new ResponseEntity<Iterable<Project>>(projects, HttpStatus.OK);
  }

  @DeleteMapping("/{projectId}")
  public ResponseEntity<?> deleteProjectById(@PathVariable String projectId) {
    projectService.deleteProjectByIdentifier(projectId);
    Map<String, String> successMap = new HashMap<>();
    successMap.put("message", "Project with id '" + projectId + "' deleted successfully.");
    return new ResponseEntity<Map<String, String>>(successMap, HttpStatus.OK);
  }
}
