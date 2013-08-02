// ==UserScript==
// @name         37signals Highrise Translation Helper
// @namespace    37signalsHighriseTranslationHelper
// @include      https://*.highrisehq.com/*
// @author       Tomaž Žlender
// @description  37signals Highrise Translation Helper
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function include_jquery_tag(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://dl.dropboxusercontent.com/u/1225636/jquery-1.10.2.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "$.noConflict();(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function include_javascript_tag(f) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")()";
    document.body.appendChild(script);
    document.body.removeChild(script); // cleanup
}

include_javascript_tag(function() {

    Translator = {
        
        // Storage variables
        translation_table: null,
        
        // Gets the translation for a given key
        GetTranslation: function(key) {

            if(Translator.translation_table == null) return key;
            return (typeof Translator.translation_table[key] == 'undefined')?key:Translator.translation_table[key];

        },
        
        // This function makes it easy to assign translations
        // to DOM elements by simply providing #ID as a key.
        AssignToDOM: function() {

            // Loop through the keys in the translation
            // table.
            for(var key in Translator.translation_table)
            {
                if(key[0] == '#') {
                    // Eat the '#'
                    key = key.substr(1);
	        
                    var element = document.getElementById(key);
		
                    if(element != null)
                    element.innerHTML = Translator.translation_table["#" + key];
                }
            }

        }
    };
});

function main() {
    Translator.translation_table = window.translations;

    var _ = function(str) {
        var trans = Translator.GetTranslation(str);
        if(arguments.length > 1) {
            args = [];
            for(var i = 1; i < arguments.length; i++) {
                args[i-1] = arguments[i];
            }
            return vsprintf(trans, args);
        }
        return trans;
    }
    
    // Page Overview
    if (jQuery('body').hasClass('overview')) {
        jQuery(".page_header h1").text(_("Latest activity"));
        jQuery("#set_recordings_view select option:first").text(_("Excerpt view"));
        jQuery("#set_recordings_view select option:last").text(_("List view"));
        jQuery("#set_recordings_view").html(function(){
            var element = jQuery(this).find('form').clone();
            jQuery(this).html(_("Show entries in") + "&nbsp;&nbsp;");
            jQuery(this).append(element);
        });

        jQuery("#dashboard_add_tasks h5:first").text(_("Your upcoming tasks"));
        jQuery("#dashboard_add_tasks #new_task_container_for_page:first p:first a:first").text(_("Add a new task"));
        jQuery("#page_sidebar div.feed a:last").text(_("Feed for latest activity"));
    }
    
    // Single Tag Page
    if (jQuery('body').hasClass('tags')) {
        jQuery("#page_header h1").html(function(){
            var element = jQuery(this).find('small').clone();
            jQuery(this).children('small').remove();
            jQuery(this).html(jQuery(this).html().replace('Contacts tagged with', _("Contacts tagged with")));
            jQuery(this).append(element);
        });
        jQuery("#rename_tag_link a").text(_("Rename tag"));
        jQuery('form.edit_tag h1 span.submit a').html(_("Cancel"));
        jQuery('form.edit_tag h1 span.submit input').val(_("Rename tag")).css('margin-left', '7px');
        jQuery('form.edit_tag h1 span.submit').html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" " + _("or") + " ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
        jQuery('form.edit_tag h1').html(function(){
            var tag_name = jQuery(this).find('#tag_name').clone();
            var span = jQuery(this).find('span.submit').clone();
            jQuery(this).html(_("Tagged:") + '&nbsp;');
            jQuery(this).append(tag_name);
            jQuery(this).append(span);
        });
        jQuery("#page_header .link_to_start_deletion ").html(_("Delete this tag"));
        jQuery('.tag_stream_toggle a').text(_("Go back to tagged contacts"));
        jQuery('.tag_stream_toggle a[href$="recordings"]').text(_("Show notes from these contacts"));
        jQuery("#tag_name_editor .show h1").html(jQuery("#tag_name_editor .show h1").html().replace("Notes from contacts tagged with", _("Notes from contacts tagged with")));
        
        jQuery("#tags_one_by_one h5 span.edit a").text(_("Multiple tags"));
        jQuery("#tags_one_by_one h5").html(function(){
            var element = jQuery(this).find('span.edit').clone();
            jQuery(this).html(_("All tags"));
            jQuery(this).prepend(element);
        });
    }
    
    // Notes List - on pages Overview, Party#show, Search
    if (jQuery('body').hasClass('overview') || jQuery('body').hasClass('party') || jQuery('body').hasClass('search')) {
        jQuery("div.recording .edit_link span").text(_("Edit"));
        jQuery("div.recording div.nubbin div.nubbin_content").css('width', '50px');

        jQuery("div.recording.note div.header span.action_links span.permalink a").text(_("Go to note"));
        jQuery("div.recording.email div.header span.action_links span.permalink a").text(_("Go to email"));
        jQuery("div.recording div.file_recording a.open_button").text(_("File this"));
    }
    
    // Page Contacts
    if (jQuery('body').hasClass('parties')) {
        jQuery('div[behavior="picker"] small a').text(_("Cancel"));
        jQuery("#page_header select optgroup:eq(0)").attr("label", _("All..."));
        jQuery("#page_header select optgroup:eq(0) option[value^='contact_import_id=&kind=people&scope=']").html(_("All people"));
        jQuery("#page_header select optgroup:eq(0) option[value^='contact_import_id=&kind=companies&scope=']").html(_("All people & companies"));
        jQuery("#page_header select optgroup:eq(0) option[value^='contact_import_id=&kind=parties&scope=']").html(_("All people & companies"));
        jQuery("#page_header select optgroup:eq(1)").attr("label", _("Recently..."));
        jQuery("#page_header select optgroup:eq(1) option[value='contact_import_id=&kind=parties&scope=recently_viewed']").html(_("Recently VIEWED contacts"));
        jQuery("#page_header select optgroup:eq(1) option[value='contact_import_id=&kind=parties&scope=recently_added']").html(_("Recently ADDED contacts"));
        jQuery("#page_header select optgroup:eq(1) option[value$='kind=parties&scope=recently_imported']").html(_("Recently IMPORTED contacts"));
        jQuery("#page_header select optgroup:eq(2)").attr("label", _("Filter by..."));
        jQuery("#page_header select optgroup:eq(2) option:eq(0)").html(_("People without notes in the last 30 days"));
        jQuery("#page_header select optgroup:eq(2) option:eq(1)").html(_("People without tags"));
        
        if(jQuery("#parties_header span.title").text() == "Recently VIEWED contacts") {
            jQuery("#parties_header span.title").text(_("Recently VIEWED contacts"));
        } else if(jQuery("#parties_header span.title").text() == "All people") {
            jQuery("#parties_header span.title").text(_("All people"));
        } else if(jQuery("#parties_header span.title").text() == "Recently ADDED contacts") {
            jQuery("#parties_header span.title").text(_("Recently ADDED contacts"));
        }
        jQuery("#parties_header small.toggle a").text(_("Change view"));

        jQuery("#page_sidebar div[behavior='tag_picker'] h5").text(_("Browse by tag"));
    
        jQuery("#page_filter_options p:first").text(_("Filter your contacts by:"));
        jQuery("#page_filter_options .menu_container:eq(0) a:first").text(_("Name"));
        jQuery("#page_filter_options .menu_container:eq(1) a:first").text(_("Title"));
        jQuery("#page_filter_options .menu_container:eq(2) a:first").text(_("Email"));
        jQuery("#page_filter_options .menu_container:eq(3) a:first").text(_("City"));
        jQuery("#page_filter_options .menu_container:eq(4) a:first").text(_("State"));
        jQuery("#page_filter_options .menu_container:eq(5) a:first").text(_("Country"));
        jQuery("#page_filter_options .menu_container:eq(6) a:first").text(_("Zip"));
        jQuery("#page_filter_options .menu_container:eq(7) a:first").text(_("Street"));
        jQuery("#page_filter_options .menu_container:eq(8) a:first").text(_("Phone"));
        jQuery("#page_filter_options .menu_container:eq(9) a:first").text(_("Background"));
        jQuery("#page_filter_options .menu_container:eq(10) a:first").text(_("Website"));
    }
    
    // Single Party Page
    if (jQuery('body').hasClass('party')) {
        jQuery("#edit_tags_link").text(_("Edit tags"));
        jQuery("#edit_tags .header").text(_("Add tags one at a time:"));
        jQuery("#edit_tags p.submit input").val(_("Add this tag"));
        jQuery("#edit_tags p.submit a").text(_("Close"));
        jQuery("#edit_tags p.submit").html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" " + _("or") + " ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
    
        jQuery(".switches a[data-display=notes_and_emails]").text(_("Notes & Emails"));
        jQuery(".switches a[data-display=deals]").text(_("Deals"));
        jQuery("#new_note_container .header h1").html(jQuery("#new_note_container .header h1").html().replace("Add a note about", _("Add a note about")));
        jQuery("#new_note_container .header p").text(_("You might enter a note about a call, or a meeting, or a conversation you just had with this person. Notes are great for keeping a history of your interactions or communications with someone."));
        jQuery("#new_note_form_basics .toggle a").text(_("Show options"));
        jQuery("#new_note_form_basics .toggle").html(function(){
            var element = jQuery(this).find('a').clone();
            jQuery(this).html(" " + _("(pripni datoteke, razprave, kupčije)"));
            jQuery(this).prepend(element);
        });
        jQuery("form.new_note .submit input").val(_("Add this note"));
    
        jQuery("div.sidebar_controls a.edit").text(_("Edit this person"));
        // Tasks
        jQuery("#sidebar_tasks_section .header h1").text(_("Tasks"));
        jQuery("#sidebar_tasks_section a.add_task").text(_("Add a task"));
        jQuery("#sidebar_tasks_section div.hover_container div.nubbin a.edit_link span").text(_("Edit"));
    
        jQuery(".personal_info.section .header h1").text(_("Personal Info"));
    }
    
    // Page New/Edit Person
    if(jQuery('body').hasClass("edit_person") || jQuery('body').hasClass("new_person")) {        
        jQuery("#person_contact_data_phone_numbers__location option[value=Home]").text(_("Home [phone number]"));
        jQuery("#person_contact_data_phone_numbers__location option[value=Work]").text(_("Work [phone number]"));
        jQuery("#person_contact_data_phone_numbers__location option[value=Mobile]").text(_("Mobile [phone number]"));
        jQuery("#person_contact_data_phone_numbers__location option[value=Pager]").text(_("Pager [phone number]"));
        jQuery("#person_contact_data_phone_numbers__location option[value=Other]").text(_("Other"));

        jQuery("#person_contact_data_email_addresses__location option[value=Home]").text(_("Home [email]"));
        jQuery("#person_contact_data_email_addresses__location option[value=Work]").text(_("Work [email]"));
        jQuery("#person_contact_data_email_addresses__location option[value=Other]").text(_("Other"));
        
        jQuery("#person_contact_data_instant_messengers__protocol option[value=Other]").text(_("Other"));
        jQuery("#person_contact_data_instant_messengers__location option[value=Work]").text(_("Work [IM]"));
        jQuery("#person_contact_data_instant_messengers__location option[value=Personal]").text(_("Personal [IM]"));
        jQuery("#person_contact_data_instant_messengers__location option[value=Other]").text(_("Other"));
        
        jQuery("#person_contact_data_web_addresses__location option[value=Personal]").text(_("Personal [website]"));
        jQuery("#person_contact_data_web_addresses__location option[value=Work]").text(_("Work [website]"));
        jQuery("#person_contact_data_web_addresses__location option[value=Other]").text(_("Other"));
        
        jQuery("#person_contact_data_addresses__location option[value=Home]").text(_("Home [address]"));
        jQuery("#person_contact_data_addresses__location option[value=Work]").text(_("Work [address]"));
        jQuery("#person_contact_data_addresses__location option[value=Other]").text(_("Other"));
        
        jQuery("form.subject div.custom_fields .section_header h1").text(_("Custom Fields"));
        jQuery("form.subject div.custom_fields .section_header a").text(_("Set up your custom fields"));
        
        jQuery("form.subject .social_fields .section_header h1").text(_("Social Networks"));
        jQuery("form.subject .social_fields table .linkedin_url .overlay_wrapper .overlabel").text(_("Add a LinkedIn profile URL"));
        jQuery("form.subject .social_fields table .twitter .overlay_wrapper .overlabel").text(_("Add a Twitter username"));
        
        jQuery("form.subject p.submit a").text(_("Cancel"));
        jQuery("form.subject p.submit").html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" " + _("or") + " ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
    }
    
    // Page New Person
    if(jQuery('body').hasClass("new_person")) {
        jQuery("#page_header h1 span.toggle a").text(_("add a new company"));
        jQuery("#page_header h1 span.toggle").html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html("ali ");
            jQuery(this).append(element);
        });
        
        jQuery("#page_header h1").html(function(){
            var element = jQuery(this).find("span.toggle").clone();
            jQuery(this).html(_("Add a new person") + " ");
            jQuery(this).append(element);
        });

        jQuery("form.subject table.contact_types tr.first_name th h2").text(_("First name"));
        jQuery("form.subject table.contact_types tr.last_name th h2").text(_("Last name"));
        jQuery("form.subject table.contact_types tr.title th h2").text(_("Title"));
        jQuery("form.subject table.contact_types tr.title td .blank_slate").text(_("Add a title"));
        jQuery("form.subject table.contact_types tr.company th h2").text(_("Company"));
        jQuery("form.subject table.contact_types tr.company td .blank_slate").text(_("Add a company"));
        jQuery("form.subject table.contact_types tr:eq(4) th h2").text(_("Phone"));
        jQuery("form.subject table.contact_types tr:eq(4) td .blank_slate").text(_("Add a phone number"));
        jQuery("form.subject table.contact_types tr:eq(4) td .add a").text(_("Add another [phone number]"));
        // Email
        jQuery("form.subject table.contact_types tr:eq(5) td h2").text(_("Email"));
        jQuery("form.subject table.contact_types tr:eq(5) td .blank_slate").text(_("Add an email address"));
        jQuery("form.subject table.contact_types tr:eq(5) td .add a").text(_("Add another [email address]"));

        // IM
        jQuery("form.subject table.contact_types tr:eq(6) td h2").text(_("IM"));
        jQuery("form.subject table.contact_types tr:eq(6) td .blank_slate").text(_("Add an instant message account"));
        jQuery("form.subject table.contact_types tr:eq(6) td .add a").text(_("Add another [IM]"));
        // Websites
        jQuery("form.subject table.contact_types tr:eq(7) th h2").text(_("Websites"));
        jQuery("form.subject table.contact_types tr:eq(7) td .blank_slate").text(_("Add a website address"));
        jQuery("form.subject table.contact_types tr:eq(7) td .add a").text(_("Add another [website]"));
        // Address
        jQuery("form.subject table.contact_types tr:eq(8) th h2").text(_("Address [heading]"));
        jQuery("form.subject table.contact_types tr:eq(8) td .blank_slate").text(_("Add an address"));
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods .fields .address .overlabel").text(_("Address [field overlay label]"));
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(1) .overlay_wrapper:eq(0) .overlabel").text(_("City"));
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(1) .overlay_wrapper:eq(1) .overlabel").text(_("State"));
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(1) .overlay_wrapper:eq(2) .overlabel").text(_("Zip"));
        jQuery("#person_contact_data_addresses__country option:first").text(_("Choose a country..."));
        jQuery("form.subject table.contact_types tr:eq(8) td .add a").text(_("Add another [address]"));
        
        jQuery("form.subject p.background_label strong").html(_("Background info"));
        jQuery("form.subject p.background_label").html(function(){
            var element = jQuery(this).find("strong").clone();
            jQuery(this).html(" " + _(" "+ "(bio, how you met, etc)"));
            jQuery(this).append(element);
        });
        
        jQuery("form.subject p.submit input").val(_("Add this person"));
    }
    
    if(jQuery('body').hasClass("edit_person")) {
        jQuery("#page_header h1").html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html(_("Edit details about") + " ");
            jQuery(this).append(element);
        });
        
        jQuery("form.subject .avatar a.admin").text(_("Change photo"));
        
        jQuery("form.subject table.contact_types tr.title th h2").text(_("Title"));
        jQuery("form.subject table.contact_types tr.title td .blank_slate").text(_("Add a title"));
        jQuery("form.subject table.contact_types tr.company th h2").text(_("Company"));
        jQuery("form.subject table.contact_types tr.company td .blank_slate").text(_("Add a company"));
        // Telefon
        jQuery("form.subject table.contact_types tr:eq(3) th h2").text(_("Phone"));
        jQuery("form.subject table.contact_types tr:eq(3) td .blank_slate").text(_("Add a phone number"));
        jQuery("form.subject table.contact_types tr:eq(3) td .add a").text(_("Add another [phone number]"));
        // Email
        jQuery("form.subject table.contact_types tr:eq(4) td h2").text(_("Email"));
        jQuery("form.subject table.contact_types tr:eq(4) td .blank_slate").text(_("Add an email address"));
        jQuery("form.subject table.contact_types tr:eq(4) td .add a").text(_("Add another [email address]"));
        // IM
        jQuery("form.subject table.contact_types tr:eq(5) td h2").text(_("IM"));
        jQuery("form.subject table.contact_types tr:eq(5) td .blank_slate").text(_("Add an instant message account"));
        jQuery("form.subject table.contact_types tr:eq(5) td .add a").text(_("Add another [IM]"));
        // WWW
        jQuery("form.subject table.contact_types tr:eq(6) th h2").text(_("Websites"));
        jQuery("form.subject table.contact_types tr:eq(6) td .blank_slate").text(_("Add a website address"));
        jQuery("form.subject table.contact_types tr:eq(6) td .add a").text(_("Add another [website]"));
        // Naslov
        jQuery("form.subject table.contact_types tr:eq(7) th h2").text(_("Address [heading]"));
        jQuery("form.subject table.contact_types tr:eq(7) td .blank_slate").text(_("Add an address"));
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods .fields .address .overlabel").text(_("Address [field overlay label]"));
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(1) .overlay_wrapper:eq(0) .overlabel").text(_("City"));
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(1) .overlay_wrapper:eq(1) .overlabel").text(_("State"));
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(1) .overlay_wrapper:eq(2) .overlabel").text(_("Zip"));
        jQuery("#person_contact_data_addresses__country option:first").text(_("Choose a country..."));
        jQuery("form.subject table.contact_types tr:eq(7) td .add a").text(_("Add another [address]"));
        // Background
        jQuery("form.subject .background h5 span").text(_("(bio, how you met, etc)"));
        jQuery("form.subject .background h5").html(function(){
            var element = jQuery(this).find('span').clone();
            jQuery(this).text(_("Background info") + " ");
            jQuery(this).append(element);
        });
        
        jQuery("form.subject .visibility.edit_section h5").text(_("Who can see this person?"));
        jQuery(".edit_person #contact_and_permissions_tab .visibility.edit_section .select_permissions .scope:eq(0) label").html(function(){
            var element = jQuery(this).find('input').clone();
            jQuery(this).text(" "+ _("Vsi uporabniki"));
            jQuery(this).prepend(element);
        });
        jQuery("form.subject  .visibility.edit_section .select_permissions .scope:eq(1) label").html(function(){
            var element = jQuery(this).find('input').clone();
            jQuery(this).text(" " + _("Just me"));
            jQuery(this).prepend(element);
        });
        
        jQuery("form.subject p.submit input").val(_("Save this person"));
        
        jQuery("div.delete_and_vcard a.delete:last").text(_("Delete this person"));
        jQuery("div.delete_and_vcard p:eq(1) a:last").text(_("Upload a vCard"));
        jQuery("div.delete_and_vcard p:eq(2) a:last").text(_("Download vCard"));
        
        jQuery("div.dim:first h5").text(_("Remember the date"));
        jQuery("div.dim:first p a").text(_("Add important dates"));
        jQuery("div.dim:first p").html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).text(_("to keep track of John's birthday or the first time you met."));
            jQuery(this).prepend(element);
        });
        
        jQuery("div.dim:last h5").text(_("Is this a duplicate?"));
        jQuery("div.dim:last p a").text(_("merge this person"));
        jQuery("div.dim:last p").html(function(){
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(anchor);
            jQuery(this).prepend(_("If so, you can") + " ");
            jQuery(this).append(" " + _("with the person you want to keep."));
        });
    }
    
    // Single Note/Email Page
    if (jQuery('body').hasClass("recording")) {
        jQuery("#page_header div.edit_links a:first").html(_("Edit"));
        jQuery("#page_header div.edit_links a:last").html(_("Delete"));
        jQuery("#new_comment div.body h1").html(_("Leave a comment..."));
        jQuery("#new_comment_form_basics a").text(_("Attach files to this comment"));
        jQuery("#new_comment div.submit input").val(_("Add this comment"));
        jQuery("#page_sidebar div.contact_info h5").html(function(){
            var element = jQuery(this).find('span').clone();
            jQuery(this).html(_("Contact Info"));
            jQuery(this).append(element);
        });
    }
    
    // Single Note Page
    if (jQuery('body').hasClass("recording") && !jQuery('body').hasClass("email")) {
        jQuery('#page_header h1').html(function(){
            var element = jQuery(this).find('a').clone();
            jQuery(this).html(_("Note about") + " ");
            jQuery(this).append(element);
        });
        jQuery("#page_sidebar div.sidebox:eq(1) h5").html(_("This note is about..."));
    }
    
    // Single Email Page
    if (jQuery('body').hasClass("recording") && jQuery('body').hasClass("email")) {
        jQuery('#page_header h1').html(function(){
            var element = jQuery(this).find('a').clone();
            jQuery(this).html(_("Email about") + " ");
            jQuery(this).append(element);
        });
        jQuery("#page_sidebar div.sidebox:eq(1) h5").html(_("This email is about..."));
    }
    
    // Main Menu
    jQuery("#global_nav li.dashboard a").text(_("Latest activity"));   
    jQuery("#global_nav .parties a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html(_("Contacts"));
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.tasks a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html(_("Tasks"));
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.kases a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html(_("Cases"));
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.deals a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html(_("Deals"));
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.search a").text(_("Search notes"));
    jQuery("#global_nav li.restore a").text(_("Trash can"));
    
    // Recently Viewed
    jQuery("#recent_items h4").text(_("Recently viewed"));
    
    // Add Task Popup
    jQuery("form.new_task").each(function(){
        jQuery(this).find('h3').html(jQuery(this).find('h3').text().replace("Add a new task about", _("Add a new task about")));
        jQuery(this).find('h3').html(jQuery(this).find('h3').text().replace("Add a new task", _("Add a new task")));
        jQuery(this).find('div.controls h5:first').html(_("When's it due?"));
        jQuery(this).find('div.controls select:first option[value=today]').text(_("Today"));
        jQuery(this).find('div.controls select:first option[value=tomorrow]').text(_("Tomorrow"));
        jQuery(this).find('div.controls select:first option[value=this_week]').text(_("This week"));
        jQuery(this).find('div.controls select:first option[value=next_week]').text(_("Next week"));
        jQuery(this).find('div.controls select:first option[value=later]').text(_("Later"));
        jQuery(this).find('div.controls select:first option[value=specific]').text(_("Specific date/time..."));
        jQuery(this).find('div.set_day_and_time div.footer span:first').text(_("At") + ": ");
        jQuery(this).find('span.link_to_set_day_and_time a').html(_('Set date/time'));
        jQuery(this).find('span.link_to_set_day_and_time').html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html(" " + _("or") + " ");
            jQuery(this).append(element);
        });
        jQuery(this).find('div.controls h5:eq(1)').html(_("Choose a category"));
        jQuery(this).find('div.controls select:last option:first').html(_("None"));
        jQuery(this).find('div.controls select:last option:last').html(_("New category..."));
        jQuery(this).find('a.edit_categories').html(_("Edit categories"));
        jQuery(this).find("label[for=public_checkbox_task]").html(_("Let everyone see this task"));
        jQuery(this).find('div.submit p a').html(_("Cancel"));
        jQuery(this).find('div.submit p input').val(_("Add this task"));
        jQuery(this).find('div.submit p').html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" " + _("or") + " ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
    });
    
    // Jump to... Box in Top Header
    jQuery("#search_wrapper .overlay_wrapper label").text(_("Jump to a contact, case, deal, or tag..."));
    
    // Links in Top Header on left
    jQuery("#global_links_container .menu_container:first a:first").html(_("Account & settings") + " <span>▼</span>");
    jQuery("#global_links_container ul.global_links a[href^='/users/']").html(_("My info"));
    jQuery("#global_links_container ul.global_links a[href='/users']").html(_("Users"));
    jQuery("#global_links_container ul.global_links a[href='/groups']").html(_("Groups"));
    jQuery("#global_links_container ul.global_links a[href='/custom_fields']").html(_("Custom Fields"));
    jQuery("#global_links_container ul.global_links a[href='/account/settings']").html(_("Logo and color"));
    jQuery("#global_links_container ul.global_links a[href='/account']").html(_("Account, upgrades, billing"));
    jQuery("#global_links_container > a:first").text(_("Sign out"));
    jQuery("#global_links_container > a:last").text(_("Help"));
    
    // Buttons in Top Header
    jQuery("#page_actions a span:first").text(_(_("Add Contact")));
    jQuery("#page_actions a span:last").text(_("New Task"));
}

include_jquery_tag(main);
