/**
 * Handles 'Bootstrap' package.
 * 
 * 参考
 * https://pgmemo.tokyo/data/archives/1144.html
 *
 * @namespace bootstrap_
 */

/**
 * @var {String}
 */
var bootstrap_uri_to_tab_key = 'bootstrap_uri_to_tab';

/**
 * @return {String}
 */
function bootstrap_get_uri() {
    return window.location.pathname;
}

/**
 * @return {Object}
 */
function bootstrap_load_tab_data() {
    var uriToTab = localStorage.getItem(bootstrap_uri_to_tab_key);
    if (uriToTab) {
        try {
            uriToTab = JSON.parse(uriToTab);
            if (typeof uriToTab != 'object') {
                uriToTab = {};
            }
        } catch (err) {
            uriToTab = {};
        }
    } else {
        uriToTab = {};
    }
    return uriToTab;
}

/**
 * @param {Object} data
 */
function bootstrap_save_tab_data(data) {
    localStorage.setItem(bootstrap_uri_to_tab_key, JSON.stringify(data));
}

/**
 * @param {String} href
 */
function bootstrap_save_tab(href) {
    var uri = bootstrap_get_uri();
    var uriToTab = bootstrap_load_tab_data();
    uriToTab[uri] = href;
    bootstrap_save_tab_data(uriToTab);
}

/**
 *
 */
function bootstrap_restore_tab() {
    var uri = bootstrap_get_uri();
    var uriToTab = bootstrap_load_tab_data();
    if (uriToTab.hasOwnProperty(uri) &&
        $('[href="' + uriToTab[uri] + '"]').length) {
    } else {
        uriToTab[uri] = $('a[data-toggle="tab"]:first').attr('href');
    }
    if (uriToTab[uri]) {
        $('[href="' + uriToTab[uri] + '"]').tab('show');
    }
}

$(document).ready(function () {

    if ($('.nav-tabs').length) {

        // for bootstrap 3 use 'shown.bs.tab', for bootstrap 2 use 'shown' in the next line
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            bootstrap_save_tab($(this).attr('href'));
        });
        bootstrap_restore_tab();

    }

});