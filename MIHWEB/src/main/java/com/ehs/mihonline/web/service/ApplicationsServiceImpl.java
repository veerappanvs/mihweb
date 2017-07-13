package com.ehs.mihonline.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.ehs.mihonline.dao.ApplicationsRepository;
import com.ehs.mihonline.entity.Applications;

@Service
public class ApplicationsServiceImpl implements ApplicationsService {

    @Autowired
    private ApplicationsRepository dao;

    @Override
    public Page<Applications> findPaginated(int page, int size) {
        return dao.findAll(new PageRequest(page, size, Direction.DESC, "appId"));
    }
    
    @Override
    public List<Applications> findAllApplications() {
        return dao.findAll();
    	/* List<Applications>  appl = dao.findAll();
    	 appl.addAll(appl.size(), appl);
    	 return appl;*/
    }
    
    @Override
    public Applications findByAppId(Integer id) {
        return dao.findOne(id);

    }
}