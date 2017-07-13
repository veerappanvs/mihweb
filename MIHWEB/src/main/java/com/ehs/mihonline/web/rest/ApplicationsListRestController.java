package com.ehs.mihonline.web.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ehs.mihonline.entity.Applications;
import com.ehs.mihonline.web.exception.MyResourceNotFoundException;
import com.ehs.mihonline.web.service.ApplicationsService;

@RestController
public class ApplicationsListRestController {

    @Autowired
    private ApplicationsService service;

    @RequestMapping(value = "/applications/get", params = { "page", "size" }, method = RequestMethod.GET, produces = "application/json")
    public Page<Applications> findPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {

        Page<Applications> resultPage = service.findPaginated(page, size);
        if (page > resultPage.getTotalPages()) {
            throw new MyResourceNotFoundException();
        }
        System.out.println("resultPage ==================> "+resultPage.getContent());
        return resultPage;
    }
    
    @RequestMapping(value = "/application/", method = RequestMethod.GET)
    public ResponseEntity<List<Applications>> listAllApplications() {
        List<Applications> applications = service.findAllApplications();
        if(applications.isEmpty()){
            return new ResponseEntity<List<Applications>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Applications>>(applications, HttpStatus.OK);
    }
    
    
    @RequestMapping(value = "/application/get",  params = { "appId"} , method = RequestMethod.GET)
    public ResponseEntity<Applications> application(@RequestParam("page") Integer appId) {
        Applications applications = service.findByAppId(appId);
        if(applications == null){
            return new ResponseEntity<Applications>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<Applications>(applications, HttpStatus.OK);
    }
}