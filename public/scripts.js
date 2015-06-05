$(document).ready(function() {
	$('.show-details').click(function() {
		toggle('desc' + this.id.substring(13));
	});
});
	
	// Allow for toggeling of the description by clicking the show details link
function toggle(id){
	if($("#"+id).is(":hidden")){
		// hidden element
		$("#"+id).slideDown("fast");
	} else {
		// showing element
		$("#"+id).slideUp("fast");
	}
	return false;
}

