create database IF NOT EXISTS patent_db default character set utf8mb4 collate utf8mb4_general_ci;

use patent_db;

create table IF NOT EXISTS t_patent; 

create table t_patent(
	`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键,和业务无关,提高存取效率',
	`patent_id` varchar(255) NOT NULL DEFAULT '' COMMENT '专利号',
	`patent_name` varchar(255) NOT NULL DEFAULT '' COMMENT '专利名称',
	`patent_url` varchar(255) NOT NULL DEFAULT '' COMMENT '专利落地页',
	`patent_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '专利类型:0发明、1实用、2外观',
	`patent_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '专利状态:0未下证、1下证、2未授权',
	`patent_price` bigint(20) NOT NULL DEFAULT '0' COMMENT '专利价格',
	`industry` int(11) NOT NULL DEFAULT '0' COMMENT '行业',
	`industry_name` varchar(60) NOT NULL DEFAULT '' COMMENT '行业',
	`is_batch` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否批量:0不批量,1批量',
	`publish_year` int(11) NOT NULL DEFAULT '0' COMMENT '发布年份',
	`publish_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`user_qq` int(11) NOT NULL DEFAULT '0' COMMENT '用户qq',
	`user_wx` varchar(30) NOT NULL DEFAULT '' COMMENT '用户wx',
	`show` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否显示:0显示,1不显示',
	PRIMARY KEY (`id`),
	INDEX `patentId` (`patent_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专利表';

create table IF NOT EXISTS t_users; 

create table t_users(
	`user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键,和业务无关,提高存取效率',
	`user_name` varchar(30) NOT NULL  DEFAULT '' COMMENT '用户名',
	`user_qq` int(11) NOT NULL DEFAULT '0' COMMENT '用户qq',
	`user_wx` varchar(30) NOT NULL DEFAULT '' COMMENT '用户wx',
	`user_phone` varchar(30) NOT NULL DEFAULT '' COMMENT '用户手机号',
	`user_email` varchar(30) NOT NULL DEFAULT '' COMMENT '用户邮箱',
	`password` varchar(30) NOT NULL DEFAULT '' COMMENT '用户密码',
	PRIMARY KEY (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
