// ==UserScript==
// @name         Highrise prevod
// @namespace    37signalsHighriseTranslation
// @include      https://kmetija.highrisehq.com/*
// @author       Tomaž Žlender
// @description  37signals Highrise slovenski prevod
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://dl.dropboxusercontent.com/u/1225636/jquery-1.10.2.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "$.noConflict();(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
} 

// the guts of this userscript
function main() {
    //odstrani obvestilo za upgradanje
    jQuery("#upgrade_bar").hide();
    
    //prevodi na strani Overview
    if (jQuery('body').hasClass('overview')) {
        jQuery(".page_header h1").text("Zadnji zapisi");
        jQuery("#set_recordings_view select option:first").text("z izvlečki");
        jQuery("#set_recordings_view select option:last").text("kot seznam");
        jQuery("#set_recordings_view").html(function(){
            var element = jQuery(this).find('form').clone();
            jQuery(this).html("Prikaži zapise&nbsp;&nbsp;");
            jQuery(this).append(element);
        });
        
        jQuery("#page_sidebar div.feed").hide();
    }
    
    //tags
    if (jQuery('body').hasClass('tags')) {
        jQuery("#page_header h1").html(function(){
            var element = jQuery(this).find('small').clone();
            jQuery(this).children('small').remove();
            jQuery(this).html(jQuery(this).html().replace('Contacts tagged with', 'Kontakti z oznako'));
            jQuery(this).append(element);
        });
        jQuery("#rename_tag_link a").text('Preimenuj oznako');
        jQuery('form.edit_tag h1 span.submit a').html('prekliči');
        jQuery('form.edit_tag h1 span.submit input').val('Preimenuj oznako').css('margin-left', '7px');
        jQuery('form.edit_tag h1 span.submit').html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(' ali ');
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
        jQuery('form.edit_tag h1').html(function(){
            var tag_name = jQuery(this).find('#tag_name').clone();
            var span = jQuery(this).find('span.submit').clone();
            jQuery(this).html('Oznaka:&nbsp;');
            jQuery(this).append(tag_name);
            jQuery(this).append(span);
        });
        jQuery("#page_header .link_to_start_deletion ").html('Izbriši oznako');
        jQuery('.tag_stream_toggle a').text("Pojdi nazaj na seznam");
        jQuery('.tag_stream_toggle a[href$="recordings"]').text("Prikaži zabeležke teh kontaktov");
        jQuery("#tag_name_editor .show h1").html(jQuery("#tag_name_editor .show h1").html().replace("Notes from contacts tagged with", "Zabeležke od kontaktov z oznako"));
        
        jQuery("#tags_one_by_one h5 span.edit a").text('Več oznak hkrati');
        jQuery("#tags_one_by_one h5").html(function(){
            var element = jQuery(this).find('span.edit').clone();
            jQuery(this).html('Vse oznake');
            jQuery(this).prepend(element);
        });
        
        jQuery("div.sidebox_wrapper div.sidebox:first").hide();
    }
    
    //skupni prevodi Overview in Party
    if (jQuery('body').hasClass('overview') || jQuery('body').hasClass('party')) {
        jQuery("div.recording .edit_link span").text("Uredi");
        jQuery("div.recording div.nubbin div.nubbin_content").css('width', '50px'); //brez tega se Uredi ne prikaže lepo
        
        jQuery("div.recording div.header span.action_links span.permalink a").text("Odpri zabeležko");
        
    }
    
    //prevodi na strani Parties
    if (jQuery('body').hasClass('parties')) {
        jQuery('div[behavior="picker"] small a').text("Prekliči");
        jQuery("#page_header select optgroup:eq(0)").attr("label", "Vsi...");
        jQuery("#page_header select optgroup:eq(0) option[value^='contact_import_id=&kind=people&scope=']").html("Vse osebe");
        jQuery("#page_header select optgroup:eq(0) option[value^='contact_import_id=&kind=companies&scope=']").html("Vsa podjetja");
        jQuery("#page_header select optgroup:eq(0) option[value^='contact_import_id=&kind=parties&scope=']").html("Vse osebe in podjetja");
        jQuery("#page_header select optgroup:eq(1)").attr("label", "Pred kratkim...");
        jQuery("#page_header select optgroup:eq(1) option[value='contact_import_id=&kind=parties&scope=recently_viewed']").html("Pred kratkim OGLEDANI kontakti");
        jQuery("#page_header select optgroup:eq(1) option[value='contact_import_id=&kind=parties&scope=recently_added']").html("Pred kratkim DODANI kontakti");
        jQuery("#page_header select optgroup:eq(1) option[value$='kind=parties&scope=recently_imported']").html("Pred kratkim UVOŽENI kontakti");
        jQuery("#page_header select optgroup:eq(2)").attr("label", "Filtriraj po...");
        jQuery("#page_header select optgroup:eq(2) option:eq(0)").html("Osebe brez zabeležk v zadnjih 30 dneh");
        jQuery("#page_header select optgroup:eq(2) option:eq(1)").html("Osebe brez oznak");
        
        if(jQuery("#parties_header span.title").text() == "Recently VIEWED contacts") {
            jQuery("#parties_header span.title").text("Pred kratkim OGLEDANI kontakti");
        } else if(jQuery("#parties_header span.title").text() == "All people") {
            jQuery("#parties_header span.title").text("Vse osebe");
        } else if(jQuery("#parties_header span.title").text() == "Recently ADDED contacts") {
            jQuery("#parties_header span.title").text("Pred kratkim DODANI kontakti");
        }
            jQuery("#parties_header small.toggle a").text("Spremeni pogled");
    
        jQuery("#page_sidebar div.recent_imports").hide();
        jQuery("#page_sidebar div.sidebox.closedbox:eq(1)").hide();
        jQuery("#page_sidebar div[behavior='tag_picker'] h5").text("Brskaj po oznaki");
    
        jQuery("#page_filter_options p:first").text("Filtriraj kontakte glede na:");
        jQuery("#page_filter_options .menu_container:eq(0) a:first").text("Ime in priimek");
        jQuery("#page_filter_options .menu_container:eq(1) a:first").text("Naziv");
        jQuery("#page_filter_options .menu_container:eq(3) a:first").text("Kraj");
        jQuery("#page_filter_options .menu_container:eq(4) a:first").text("Občina");
        jQuery("#page_filter_options .menu_container:eq(5) a:first").text("Država");
        jQuery("#page_filter_options .menu_container:eq(6) a:first").text("Poštna številka");
        jQuery("#page_filter_options .menu_container:eq(7) a:first").text("Ulica");
        jQuery("#page_filter_options .menu_container:eq(8) a:first").text("Telefon");
        jQuery("#page_filter_options .menu_container:eq(9) a:first").text("Ozadje");
        jQuery("#page_filter_options .menu_container:eq(10) a:first").text("Spletna stran");
    }
    
    //prevodi na strani Party
    if (jQuery('body').hasClass('party')) {
        jQuery("#edit_tags_link").text("Uredi oznake");
        jQuery("#edit_tags .header").text("Dodaj oznake eno pa po eno");
        jQuery("#edit_tags p.submit input").val("Dodaj oznako");
        jQuery("#edit_tags p.submit a").text("zapri");
        jQuery("#edit_tags p.submit").html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" ali ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
    
        jQuery(".switches a[data-display=notes_and_emails]").text("Zabeležke");
        jQuery(".switches a[data-display=deals]").text("Kupčije");
        jQuery("#new_note_container .header h1").text("Dodaj novo zabeležko");
        jQuery("#new_note_container .header p").text("Dodaj zabeležko o klicu, srečanju, pogovoru, ki si ga pravkar imel s to osebo. Zabeležke so super za hranjenje zgodovine o tvoji komunikaciji z nekom.");
        jQuery("#new_note_form_basics .toggle a").text("Prikaži možnosti");
        //jQuery("#new_note_form_basics .toggle").translateTextWithoutTag(" (pripni datoteke, razprave, kupčije)", {surrounding_html: {a: 'prepend'}});
        jQuery("#new_note_form_basics .toggle").html(function(){
            var element = jQuery(this).find('a').clone();
            jQuery(this).html(" (pripni datoteke, razprave, kupčije)");
            jQuery(this).prepend(element);
        });
        jQuery("form.new_note .submit input").val("Dodaj zabeležko");
        
        jQuery('#recordings_toggles div.links').hide();
    
        jQuery("div.sidebar_controls a.edit").text("Uredi kontakt");
        // Tasks
        jQuery("#sidebar_tasks_section .header h1").text("Opombniki");
        jQuery("#sidebar_tasks_section a.add_task").text("Dodaj opombnik");
        jQuery("#sidebar_tasks_section div.hover_container div.nubbin a.edit_link span").text("Uredi");
    
        jQuery(".personal_info.section .header h1").text("Osebni podatki");
    }
    
    //skupni prevodi strani New Person in Edit Person    
    if(jQuery('body').hasClass("edit_person") || jQuery('body').hasClass("new_person")) {        
        jQuery("#person_contact_data_phone_numbers__location").val("Home");
        jQuery("#person_contact_data_phone_numbers__location option[value=Home]").text("Domač");
        jQuery("#person_contact_data_phone_numbers__location option[value=Work]").text("Služben");
        jQuery("#person_contact_data_phone_numbers__location option[value=Mobile]").text("Mobilni");
        jQuery("#person_contact_data_phone_numbers__location option[value=Pager]").text("Pozivnik");
        jQuery("#person_contact_data_phone_numbers__location option[value=Other]").text("Drugo");

        jQuery("#person_contact_data_email_addresses__location").val("Home");
        jQuery("#person_contact_data_email_addresses__location option[value=Home]").text("Oseben");
        jQuery("#person_contact_data_email_addresses__location option[value=Work]").text("Služben");
        jQuery("#person_contact_data_email_addresses__location option[value=Other]").text("Drugo");
        
        jQuery("#person_contact_data_web_addresses__location").val("Personal");
        jQuery("#person_contact_data_web_addresses__location option[value=Personal]").text("Osebna");
        jQuery("#person_contact_data_web_addresses__location option[value=Work]").text("Službena");
        jQuery("#person_contact_data_web_addresses__location option[value=Other]").text("Drugo");
        
        jQuery("#person_contact_data_addresses__location").val("Home");
        jQuery("#person_contact_data_addresses__location option[value=Home]").text("Domač");
        jQuery("#person_contact_data_addresses__location option[value=Work]").text("Služben");
        jQuery("#person_contact_data_addresses__location option[value=Other]").text("Drugo");
        
        jQuery("form.subject div.custom_fields .section_header h1").text("Dodatna polja");
        jQuery("form.subject div.custom_fields .section_header a").text("Nastavi dodatna polja");
        
        jQuery(".social_fields").hide();
        jQuery("form.subject .social_fields .section_header h1").text("Socialna omrežja");
        jQuery("form.subject .social_fields table .linkedin_url .overlay_wrapper .overlabel").text("Dodaj URL od LinkedIn profila");
        jQuery("form.subject .social_fields table .twitter .overlay_wrapper .overlabel").text("Dodaj Twitter uporabniško ime");
        
        jQuery("form.subject p.submit input").val("Shrani spremembe");
        jQuery("form.subject p.submit a").text("prekliči");
        jQuery("form.subject p.submit").html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" ali ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
        
        jQuery("div.delete_and_vcard a.delete:last").text("Izbriši kontakt");
        jQuery("div.delete_and_vcard p:eq(1) a:last").text("Naloži vCard");
        jQuery("div.delete_and_vcard p:eq(2) a:last").text("Dolpotegni vCard");
        
        jQuery("div.dim:first h5").text("Zapomni si datum");
        jQuery("div.dim:first p a").text("Dodaj pomemben datum");
        jQuery("div.dim:first p").html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html(", da si lažje zapomniš rojstni dan osebe ali kdaj sta se spoznala.");
            jQuery(this).prepend(element);
        });
        
        jQuery("div.dim:last h5").text("Je to dvojnik?");
        jQuery("div.dim:last p a").text("združiš");
        jQuery("div.dim:last p").html(function(){
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(anchor);
            jQuery(this).prepend("Če je, lahko osebo ");
            jQuery(this).append(" z osebo, ki jo želiš obdržati.");
        });
    }
    
    if(jQuery('body').hasClass("new_person")) {
        jQuery("#page_sidebar").hide();
        
        jQuery("#page_header h1 span.toggle a").text("dodaj novo podjetje");
        jQuery("#page_header h1 span.toggle").html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html("ali ");
            jQuery(this).append(element);
        });
        
        jQuery("#page_header h1").html(function(){
            var element = jQuery(this).find("span.toggle").clone();
            jQuery(this).html("Dodaj novo osebo ");
            jQuery(this).append(element);
        });

        jQuery("form.subject table.contact_types tr.first_name th h2").text("Ime");
        jQuery("form.subject table.contact_types tr.last_name th h2").text("Priimek");
        jQuery("form.subject table.contact_types tr.title th h2").text("Naziv");
        jQuery("form.subject table.contact_types tr.title td .blank_slate").text("Dodaj naziv");
        jQuery("form.subject table.contact_types tr.company th h2").text("Podjetje");
        jQuery("form.subject table.contact_types tr.company td .blank_slate").text("Dodaj podjetje");
        jQuery("form.subject table.contact_types tr:eq(4) th h2").text("Telefon");
        jQuery("form.subject table.contact_types tr:eq(4) td .blank_slate").text("Dodaj telefonsko številko");
        jQuery("form.subject table.contact_types tr:eq(4) td .add a").text("Dodaj še eno številko");
        jQuery("form.subject table.contact_types tr:eq(5) td .blank_slate").text("Dodaj email naslov");
        jQuery("form.subject table.contact_types tr:eq(5) td .add a").text("Dodaj še en email");
        jQuery("form.subject table.contact_types tr:eq(6)").hide();
        jQuery("form.subject table.contact_types tr:eq(6) td .blank_slate").text("Dodaj IM račun");
        jQuery("form.subject table.contact_types tr:eq(6) td .add a").text("Dodaj še en račun");
        jQuery("form.subject table.contact_types tr:eq(7) th h2").text("Spletna stran");
        jQuery("form.subject table.contact_types tr:eq(7) td .add a").text("Dodaj še eno spletno stran");
        jQuery("form.subject table.contact_types tr:eq(7) td .blank_slate").text("Dodaj spletno stran");
        jQuery("form.subject table.contact_types tr:eq(8) th h2").text("Naslov");
        jQuery("form.subject table.contact_types tr:eq(8) td .blank_slate").text("Dodaj naslov");
        jQuery("form.subject table.contact_types tr:eq(8) td .blank_slate").text("Dodaj naslov");
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods .fields .address .overlabel").text("Ulica in hišna številka");
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(1) .overlay_wrapper:eq(0) .overlabel").text("Kraj");
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(1) .overlay_wrapper:eq(1) .overlabel").text("Občina");
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(1) .overlay_wrapper:eq(2) .overlabel").text("Poštna št.");
        jQuery("form.subject table.contact_types tr:eq(8) td .contact_methods p:eq(2) .country option:first").text("Izberi državo...");
        jQuery("form.subject table.contact_types tr:eq(8) td .add a").text("Dodaj še en naslov");
        
        jQuery("form.subject p.background_label").html("<strong>Ozadje o osebi</strong> (bio, kako sta se spoznala, ipd.)");
        
        jQuery("form.subject p.submit input").val("Dodaj osebo");
    }
    
    if(jQuery('body').hasClass("edit_person")) {
        jQuery("#page_header h1").html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html("Uredi podrobnosti o ");
            jQuery(this).append(element);
        });
        
        jQuery("form.subject .avatar a.admin").text("Spremeni fotko");
        
        jQuery("form.subject table.contact_types tr.title th h2").text("Naziv");
        jQuery("form.subject table.contact_types tr.title td .blank_slate").text("Dodaj naziv");
        jQuery("form.subject table.contact_types tr.company th h2").text("Podjetje");
        jQuery("form.subject table.contact_types tr.company td .blank_slate").text("Dodaj podjetje");
        // Telefon
        jQuery("form.subject table.contact_types tr:eq(3) th h2").text("Telefon");
        jQuery("form.subject table.contact_types tr:eq(3) td .blank_slate").text("Dodaj telefonsko številko");
        jQuery("form.subject table.contact_types tr:eq(3) td .add a").text("Dodaj še eno številko");
        // Email
        jQuery("form.subject table.contact_types tr:eq(4) td .blank_slate").text("Dodaj email naslov");
        jQuery("form.subject table.contact_types tr:eq(4) td .add a").text("Dodaj še en email");
        // IM
        jQuery("form.subject table.contact_types tr:eq(5)").hide();
        jQuery("form.subject table.contact_types tr:eq(5) td .blank_slate").text("Dodaj IM račun");
        jQuery("form.subject table.contact_types tr:eq(5) td .add a").text("Dodaj še en račun");
        // WWW
        jQuery("form.subject table.contact_types tr:eq(6) th h2").text("Spletna stran");
        jQuery("form.subject table.contact_types tr:eq(6) td .add a").text("Dodaj še eno spletno stran");
        jQuery("form.subject table.contact_types tr:eq(6) td .blank_slate").text("Dodaj spletno stran");
        // Naslov
        jQuery("form.subject table.contact_types tr:eq(7) th h2").text("Naslov");
        jQuery("form.subject table.contact_types tr:eq(7) td .blank_slate").text("Dodaj naslov");
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods .fields .address .overlabel").text("Ulica in hišna številka");
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(1) .overlay_wrapper:eq(0) .overlabel").text("Kraj");
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(1) .overlay_wrapper:eq(1) .overlabel").text("Občina");
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(1) .overlay_wrapper:eq(2) .overlabel").text("Poštna št.");
        jQuery("form.subject table.contact_types tr:eq(7) td .contact_methods p:eq(2) .country option:first").val("Slovenija").text("Slovenija");
        jQuery("form.subject table.contact_types tr:eq(7) td .add a").text("Dodaj še en naslov");
        // Background
        jQuery("form.subject .background h5").html("Ozadje o osebi <span>(bio, kako sta se spoznala, ipd.)</span>");
        
        jQuery("form.subject .visibility.edit_section h5").text("Kdo lahko vidi osebo?");
        jQuery(".edit_person #contact_and_permissions_tab .visibility.edit_section .select_permissions .scope:eq(0) label").html(function(){
            var element = jQuery(this).find('input').clone();
            jQuery(this).html(" Vsi uporabniki");
            jQuery(this).prepend(element);
        });
        jQuery("form.subject  .visibility.edit_section .select_permissions .scope:eq(1) label").html(function(){
            var element = jQuery(this).find('input').clone();
            jQuery(this).html(" Samo jaz");
            jQuery(this).prepend(element);
        });
    }
    
    // Note
    if (jQuery('body').hasClass("recording")) {
        jQuery('#page_header h1').html(function(){
            var element = jQuery(this).find('a').clone();
            jQuery(this).html("Zabeležka o ");
            jQuery(this).append(element);
        });
        jQuery("#page_header div.edit_links a:first").html("Uredi");
        jQuery("#page_header div.edit_links a:last").html("Izbriši");
        jQuery("#new_comment div.body h1").html("Pusti komentar...");
        jQuery("#new_comment #new_comment_form_basics a").hide();
        jQuery("#new_comment div.submit input").val("Dodaj komentar");
        
        jQuery("#page_sidebar div.sidebox:eq(1) h5").html("Zabeležka glede osebe...");
        jQuery("#page_sidebar div.sidebox:eq(2) h5").html(function(){
            var element = jQuery(this).find('span').clone();
            jQuery(this).html("Podrobnosti");
            jQuery(this).append(element);
        });
    }
    
    //Glavni meni na levi
    jQuery("#global_nav li.dashboard a").text("Zadnji zapisi");   
    jQuery("#global_nav .parties a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html("Kontakti");
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.tasks a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html("Opombniki");
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.kases a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html("Mape");
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.deals a").html(function(){
        var element = jQuery(this).find('span').clone();
        jQuery(this).html("Kupčije");
        jQuery(this).append(element);
    });
    jQuery("#global_nav li.search a").text("Išči zabeležke");
    jQuery("#global_nav li.restore a").text("Koš");
    
    //Recently viewed na levi
    jQuery("#recent_items h4").text("Pred kratkim ogledano");
    
    //Dodaj opombnik
    jQuery("form.new_task").each(function(){
        jQuery(this).find('h3').html(jQuery(this).find('h3').text().replace("Add a new task", "Dodaj nov opombnik"));
        jQuery(this).find('h3').html(jQuery(this).find('h3').text().replace("about", "o"));
        jQuery(this).find('div.controls h5:first').html("Kdaj je rok?");
        jQuery(this).find('div.controls select:first option[value=today]').text("Danes");
        jQuery(this).find('div.controls select:first option[value=tomorrow]').text("Jutri");
        jQuery(this).find('div.controls select:first option[value=this_week]').text("Ta teden");
        jQuery(this).find('div.controls select:first option[value=next_week]').text("Naslednji teden");
        jQuery(this).find('div.controls select:first option[value=later]').text("Kasneje");
        jQuery(this).find('div.controls select:first option[value=specific]').text("Točen datum in ura...");
        jQuery(this).find('div.set_day_and_time div.footer span:first').text("Rok: ");
        jQuery(this).find('span.link_to_set_day_and_time a').html('natančneje');
        jQuery(this).find('span.link_to_set_day_and_time').html(function(){
            var element = jQuery(this).find("a").clone();
            jQuery(this).html(" ali ");
            jQuery(this).append(element);
        });
        jQuery(this).find('div.controls h5:eq(1)').html("Izberi kategorijo");
        jQuery(this).find('div.controls select:last option:first').html("Brez");
        jQuery(this).find('div.controls select:last option:last').html("Dodaj kategorijo...");
        jQuery(this).find('a.edit_categories').html("Uredi kategorije");
        jQuery(this).find("label[for=public_checkbox_task]").html("Dovoli, da vsi vidijo opombnik");
        jQuery(this).find('div.submit p a').html("prikliči");
        jQuery(this).find('div.submit p input').val("Dodaj opombnik");
        jQuery(this).find('div.submit p').html(function(){
            var input = jQuery(this).find('input').clone();
            var anchor = jQuery(this).find('a').clone();
            jQuery(this).html(" ali ");
            jQuery(this).prepend(input);
            jQuery(this).append(anchor);
        });
    });
    
    //Search box on top
    jQuery("#search_wrapper .overlay_wrapper label").text("Skoči na kontakt ali oznako...");
    
    //Povezave v glavi na levi
    jQuery("#global_links_container .menu_container:first a:first").html("Račun & nastavitve <span>▼</span>");
    jQuery("#global_links_container > a:first").text("Odjavi me");
    jQuery("#global_links_container > a:last").text("P");
    
    //Your upcoming tasks na desni
    jQuery("#dashboard_add_tasks h5:first").text("Prihajajoči opombniki");
    jQuery("#dashboard_add_tasks #new_task_container_for_page:first p:first a:first").text("Dodaj nov opombnik");
    
    //Gumba v glavi na levi od iskanja
    jQuery("#page_actions a span:first").text("Dodaj kontakt");
    jQuery("#page_actions a span:last").text("Dodaj opombnik");
}

// load jQuery and execute the main function
addJQuery(main);
