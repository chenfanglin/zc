create database IF NOT EXISTS test_db default character set utf8mb4 collate utf8mb4_general_ci;

use test_db;

create table IF NOT EXISTS t_patent; 

create table t_patent(
	`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键,和业务无关,提高存取效率',
	`patent_id` varchar(60) NOT NULL DEFAULT '' COMMENT '专利号',
	`patent_name` varchar(255) NOT NULL DEFAULT '' COMMENT '专利名称',
	`patent_url` varchar(255) NOT NULL DEFAULT '' COMMENT '专利落地页',
	`patent_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '专利类型:0发明、1实用、2外观',
	`patent_type_name` varchar(60) NOT NULL DEFAULT '' COMMENT '专利类型:0发明、1实用、2外观',
	`patent_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '专利状态:0未下证、1下证、2未授权',
	`patent_status_name` varchar(20) NOT NULL DEFAULT '' COMMENT '专利状态:0未下证、1下证、2未授权',
	`patent_price` varchar(60) NOT NULL DEFAULT '' COMMENT '专利价格',
	`industry` int(11) NOT NULL DEFAULT '0' COMMENT '行业',
	`industry_name` varchar(60) NOT NULL DEFAULT '' COMMENT '行业',
	`is_batch` tinyint(4) NOT NULL DEFAULT '-1' COMMENT '是否批量:0不批量,1批量',
	`is_batch_name` varchar(20) NOT NULL DEFAULT '' COMMENT '是否批量:0不批量,1批量',
	`publish_year` varchar(20) NOT NULL DEFAULT '2018' COMMENT '发布年份',
	`publish_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`user_qq` varchar(30) NOT NULL DEFAULT '' COMMENT '用户qq',
	`user_wx` varchar(30) NOT NULL DEFAULT '' COMMENT '用户wx',
	`seller_contact` varchar(30) NOT NULL DEFAULT '' COMMENT '卖家联系人',
	`patentee` varchar(30) NOT NULL DEFAULT '' COMMENT '专利权人',
	`sales_status` varchar(30) NOT NULL DEFAULT '' COMMENT '销售状态',
	`contact` varchar(30) NOT NULL DEFAULT '' COMMENT '联系人',
	`is_show` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否显示:0显示,1不显示',
	PRIMARY KEY (`id`),
	UNIQUE KEY `patentId` (`patent_id`)
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

insert into t_users(`user_name`,`password`) values('luojun','123456');

create table IF NOT EXISTS t_menu; 

create table t_menu(
	`menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单id',
	`menu_logo` varchar(30) NOT NULL  DEFAULT '' COMMENT '菜单图标',
	`menu_name` varchar(20) NOT NULL DEFAULT '' COMMENT '菜单名称',
	`menu_path` varchar(30) NOT NULL DEFAULT '' COMMENT '菜单路径',
	PRIMARY KEY (`menu_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

insert into t_menu(`menu_logo`,`menu_name`,`menu_path`) values('user','专利管理','patent_manager.jsp');

create table IF NOT EXISTS t_params; 

create table t_params(
	`param_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '参数id',
	`param_type` varchar(20) NOT NULL  DEFAULT '' COMMENT '参数类型',
	`param_name` varchar(20) NOT NULL DEFAULT '' COMMENT '参数名称',
	`param_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '参数状态,0启用,1停用',
	`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
	UNIQUE KEY `unique_params` (`param_type`,`param_name`),
	PRIMARY KEY (`param_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='参数表';

create table IF NOT EXISTS t_config_manager; 

create table t_config_manager(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
	`lable_name` varchar(20) NOT NULL  DEFAULT '' COMMENT '页签名称',
	`lable_id` varchar(20) NOT NULL DEFAULT '' COMMENT '页签id',
	`label_table_id` varchar(20) NOT NULL DEFAULT '' COMMENT '页签tableid',
	`event` varchar(20) NOT NULL DEFAULT '' COMMENT '事件名称',
	`url` varchar(40) NOT NULL DEFAULT '' COMMENT '请求表格数据url',
	`enum_type_id` varchar(20) NOT NULL DEFAULT '' COMMENT '参数名称',
	`visible` tinyint(4) NOT NULL DEFAULT '0' COMMENT '参数状态,0启用,1停用',
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='配置表';

create table t_hot_words(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
	`hot_word` varchar(20) NOT NULL  DEFAULT '' COMMENT '热门词汇',
	`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
	UNIQUE KEY `hot_word` (`hot_word`),
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='热门搜索';
