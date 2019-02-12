module.exports = {

	allCoursesFetchDataSql: function(){

		let sql = 	'select s.name,\n\
					(select count(*)  from linkdata as l where l.subject = s.id) as totallinks ,\n\
					(select count(*)  from notesdata as n where n.subject = s.id) as totalnotes\n\
					from subject as s group by s.id';

        return sql;

	},

	fetchLinkDataSql: function(subjectname){

		let sql = 'select l.link, l.comments from linkdata as l \n\
             		JOIN subject as s on s.id = l.subject \n\
             		where s.name like "%'+subjectname+'%"';

        return sql;

	},

	fetchNotesDataSql: function(subjectname){

		let sql = 'select n.notes,n.comments from notesdata as n \n\
             		JOIN subject as s on s.id = n.subject \n\
             		where s.name like "%'+subjectname+'%"';

        return sql;

	},

	saveLinkData: function(values){

		let sql = 'INSERT INTO linkdata(subject,link,comments,createdate) VALUES(' + values + ')'

		return sql;
	},

	saveNotesData: function(values){

		let sql = 'INSERT INTO notesdata(subject,notes,comments,createdate) VALUES(' + values + ')'

		return sql;
	},

	findSubjectIDbySubjectName(subjectname){

		let sql = 'select id from subject where name like "%'+ subjectname + '%"';

		return sql;

	},

}