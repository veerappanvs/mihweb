package com.ehs.mihonline.web.service;


import java.util.List;

import org.springframework.data.domain.Page;

import com.ehs.mihonline.entity.Applications;

public interface ApplicationsService {
	 public Page<Applications> findPaginated(final int page, final int size);

	List<Applications> findAllApplications();
	Applications findByAppId(Integer id);
}