/* global EpiLib */

EpiUi.showWidget = function (title, html) {
    var $modal = $("#utilities__info");
    var modalHtml =
            "<div id=\"widget-modal\" class=\"modal\">" +
            "<h4>" +
            title +
            "</h4>" +
            "<p class=\"content-modal\">" +
            html +
            "</p>" +
            "<a href=\"javascript:void(0)\" class=\"close-reveal-modal\">Close</a>" +
            "</div>";
    if ($modal.length === 0) {
        $("body").append($("<div>", {id: "utilities__info", "class": "blocker"}));
        $modal = $("#utilities__info");
        $modal.html(modalHtml);
    } else {
        $modal.html(modalHtml);
    }

    $(".close-modal").unbind("click");
    $(".close-modal").on("click",
            function () {
                $modal.remove();
            });
    $(".blocker").unbind("click");
    $(".blocker").on("click",
            function () {
                $modal.remove();
            });
};

function EpiUi() {
    var self = this;

    this.goTop = function () {
        $(".nav li.is-last").click(function () {
            $(".header form.global-search input[type='text'").focus();
        });
    };
    this.scroll = function () {
        $(document).scroll(function () {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > 50)
                $(".nav").addClass("is-fixed");
            else
                $(".nav").removeClass("is-fixed");
        });
    };
    this.fixer = function () {

        $(".main-filter").fixer({
            gap: 40,
            top: 15
        });

        $(".article__social-v").fixer({
            gap: 35,
            top: 0.1
        });

    };

    this.setActive = function () {

        switch (EpiLib.pageType) {
            case "homepage":
                $(".main-filter a.popular").addClass("is-active");
                break;
            case "latest":
                if (typeof window.cate_id === "undefined")
                    $(".main-filter a.latest").addClass("is-active");
                break;
            case "video":
                $(".main-filter a.video").addClass("is-active");
                break;
            case "topiclist":
                $(".main-filter a.topiclist").addClass("is-active");
                break;
            case "recommend":
                $(".main-filter a.recommend").addClass("is-active");
                break;
            case "overview":
                $(".main-filter a.overview").addClass("is-active");
                break;
        }

        if (window.location.pathname === "/")
            $(".nav ul > li.has-icon a").addClass("is-active");
        else {
            if (typeof window.cate_id !== "undefined") {
                var a = $(".nav ul li a[data-id=" + window.cate_id + "]");
                if (a)
                    $(a).parents("li").addClass("is-active");
            }
        }
    };
    this.load = function () {
        self.goTop();
        self.scroll();
        self.fixer();
        self.setActive();

        $(".header__action a.mobile").click(function (event) {
            event.preventDefault();
            $.removeCookie("bm_web", {path: "/"});
            var targetHost = $(this).attr("data-target-host");
            window.location.replace(targetHost + window.location.pathname + "#bm_web");
        });
    };
}

new EpiUi().load();