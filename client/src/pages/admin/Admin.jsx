import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
/*import Datatable from "datatables.net-searchpanes"; 
import tinymce from 'tinymce/tinymce';
import $ from 'jquery';*/
import Chart from 'chart.js/auto';
import AdminMenu from '../../components/admin/menu/AdminMenu.jsx';
import AdminStyle from './admin.css';
import AdminContent from '../../components/admin/content/AdminContent.jsx';

// Theme
/*import 'tinymce/themes/silver';*/

function Admin() {

  // Tableau utilisé pour créer dynamiquement les champs de la modal d'update
  const formInputs = {
    Post: {
      Title: {
        type: "text",
      },
      Category: {
        type: "select",
        table: "Category",
      },
      Content: {
        type: "textarea",
      },
    },
    Comment: {
      Content: {
        type: "textarea",
      },
    },
    User: {},
    Category: {},
  };
  /*
  $(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let tableParam = urlParams.get("table");
    var table = tableParam ? tableParam : "Charts";
  
    // Appel de l'initialisation de DataTable en fonction du type de données choisi
    $(document).on("click", ".catBtn", function () {
      $(".catBtn").removeClass("activeCat");
      $(this).addClass("activeCat");
      if ($(this).attr("data-table") == "Charts") {
        $("#table").addClass("hidden");
        $("#cardsContainer").removeClass("hidden");
      } else {
        $("#table").removeClass("hidden");
        $("#cardsContainer").addClass("hidden");
      }
      initDatatable($(this).attr("data-table"));
      checkPoint(
        "Appel de l'initialisation de DataTable sur la table " +
          $(this).attr("data-table")
      );
    });
  
    // Affichage des différentes stats
    $(document).on("click", "#topCont .card", function () {
      checkPoint(
        "Chargement des statistiques de la table " + $(this).attr("data-chart")
      );
      $("#topCont .card").removeClass("activeChart");
      $(this).addClass("activeChart");
      const type = $(this).attr("data-chart");
  
      var params = new Object();
      params.action = "getStats";
      params.what = type;
      fetch("/fetching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((x) => x.json())
        .then((x) => {
          checkPoint(
            "Requête effectuée, appel de la fonction de génération des charts"
          );
          generateChart(x, type);
        });
    });
  
    //Initialisation menu actif
    $("li[data-table='" + table + "']").click();
  
    //Initialisation de l'animation de comptage des différents éléments (posts, categories, users, comments)
    function countElements(response) {
      const types = [
        ["postCount", response.Post[0].Count],
        ["categoryCount", response.Category[0].Count],
        ["usersCount", response.User[0].Count],
        ["commentCount", response.Comment[0].Count],
      ];
      types.forEach((element) => {
        checkPoint("Début de l'animation de comptage");
        new CountUp(element[0], 0, element[1], 0, 2.5).start();
      });
    }
  

    async function generateChart(data, type) {
      checkPoint("Génération des charts");
      var dataC = [];
      var titleText = "";
      var typeChart = "";
      if (type == "Post" || type == "User") {
        dataC = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        var lab = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        typeChart = "line";
        titleText =
          type == "Post"
            ? "PUBLISHED post PER MONTH"
            : "USERS REGISTRATION PER MONTH";
      } else if (type == "Category") {
        data.DataChart.forEach((element) => dataC.push(element.Critere));
        var lab = dataC;
        titleText = "PUBLISHED post PER category";
        typeChart = "bar";
      }
      data.DataChart.forEach(
        (element) => (dataC[element.Critere - 1] = element.Count)
      );
      $("#chartCont").html(
        '<canvas id="myChart" width="825" height="400"></canvas>'
      );
      var chart = document.getElementById("myChart");
      var myMonthlyChart = new Chart(chart, {
        type: typeChart,
        data: {
          labels: lab,
          datasets: [
            {
              //stack: 0,
              data: dataC,
              backgroundColor: ["rgba(0,243,255,1)"],
              borderColor: ["rgba(5,170,223,1)"],
              borderWidth: 1,
              pointBackgroundColor: "rgba(92, 145, 249, 1)",
              lineTension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: titleText,
              fontColor: "rgba(0,243,255,1)",
              font: {
                size: 20,
              },
            },
          },
  
          tooltips: { mode: "point" },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  suggestedMin: 0,
                },
              },
            ],
            yAxes: [
              {
                stacked: true,
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  suggestedMin: 0,
                },
              },
            ],
          },
        },
      });
      checkPoint("Chart généré !");
    }
  
    var tableAdmin = null;
  
    // Initialisation de DataTable et chargement des données
    function initDatatable(table) {
      checkPoint(
        "Requête BDD de la table " + table + "pour initialisation de DataTable"
      );
      var params = new Object();
      params.action = "get";
      params.table = table;
      fetch("/fetching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((x) => x.json())
        .then((x) => {
          checkPoint(
            "Création dynamique des colonnes de DataTable en fonction de la table à afficher"
          );
          if (table != "Charts") {
            const dataArray = [];
            var dataAttributes = "";
            const columnsToExclude = [
              "Liked",
              "Disliked",
              "Image",
              "Gif",
              "Password",
              "SecretQuestion",
              "SecretAnswer",
              "Count",
              "AuthorID",
              "Reason",
              "Content",
              "CategoryID",
            ];
            if (table == "Post") {
              // Ajout du nombre de like / dislike pour chaque post
              x[table].forEach((ind) => {
                // Boucle sur x.Post
                ind["like"] = 0; // Valeurs par défaut
                ind["Dislike"] = 0;
                x["CountLike"].forEach((index) => {
                  // Boucle sur x.CountLike
                  if (ind["ID"] == index["PostId"]) {
                    ind["like"] =
                      index["Countlike"] +
                      `<i class='fas fa-heart ml-2 text-danger'></i>`;
                    ind["Dislike"] =
                      index["CountDislike"] +
                      `<i class='fas fa-heart-broken ml-2'></i>`;
                  }
                });
              });
            }
            Object.entries(x[table][0]).forEach(([key, value]) => {
              if (!columnsToExclude.includes(key)) {
                if (
                  key.toLowerCase() != "author" &&
                  key.toLowerCase() != "category"
                ) {
                  dataAttributes +=
                    "data-" + key.toLowerCase() + '="' + value + '" ';
                }
                var column = {};
                column.title = key
                  .replace("ID", "Id")
                  .replace(/([A-Z])/g, " $1")
                  .toUpperCase() //.replace(/_/g, " ") => pour transformer du snake case;
                  .trim();
                column.data = key;
                // Paramètres spécifiques
                if (key == "Date") {
                  column.render = function (data) {
                    return convertirDate(data);
                  };
                } else if (key == "Avatar") {
                  column.render = function (data) {
                    return (
                      `<div class="avatar" style="background-image:URL('.` +
                      data +
                      `');"></div>`
                    );
                  };
                } else if (key == "House") {
                  column.render = function (data) {
                    return (
                      `<div class="house infoLien" style="background-image:URL('..` +
                      data.Image +
                      `');"><span>` +
                      data.Name +
                      `</span></div>`
                    );
                  };
                } else if (key == "Author") {
                  column.render = function (data) {
                    return data.Username;
                  };
                } else if (key == "Category") {
                  column.render = function (data) {
                    return data.Name;
                  };
                } else if (key.includes("State")) {
                  column.render = function (data, type, row, meta) {
                    var result =
                      data == 1
                        ? '<div class="toggleStateBtn" data-table="' +
                          table +
                          '" data-value="' +
                          data +
                          '" data-id="' +
                          row.ID +
                          '" data-column="' +
                          column.title +
                          '"><i class="fas fa-eye"></i></div>'
                        : '<div class="toggleStateBtn" data-table="' +
                          table +
                          '" data-value="' +
                          data +
                          '" data-id="' +
                          row.ID +
                          '" data-column="' +
                          column.title +
                          '"><i class="fas fa-eye-slash"></i></div>';
                    return result;
                  };
                }
                dataArray.push(column);
              }
            });
            // Paramètres globaux
            dataArray.push({
              class: "action",
              title: "ACTIONS",
              orderable: false,
              render: function (data, type, row, meta) {
                return (
                  '<div class="btn btn-outline-blue editLink mr-3" data-id="' +
                  row.ID +
                  '" data-table-type="' +
                  table +
                  '" ' +
                  dataAttributes +
                  ' data-toggle="modal" data-target="#updateModal"><i class="far fa-edit"></i></div><div class="btn btn-outline-danger deleteLink" data-id="' +
                  row.ID +
                  '"><i class="far fa-trash-alt"></i></div>'
                );
              },
            });
            if (tableAdmin != null) {
              tableAdmin.destroy();
              $("#tableAdmin").empty();
            }
            checkPoint("Début de l'initialisation de DataTable");
            tableAdmin = $("#tableAdmin").DataTable({
              columns: dataArray,
              data: x[table],
              scrollX: true,
              autoWidth: false,
              order: [[0, "desc"]],
            });
          } else {
            // Si onglet actif = Charts
            countElements(x);
            $("div[data-chart='Post']").click();
          }
        });
    }
  
    // Conversion des dates avant affichage dans le DataTable
    function convertirDate(date) {
      var monthName = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      var dayName = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ];
  
      var maDate = new Date(date);
      var jour = maDate.getDay(); //Jour
      var njour = maDate.getDate(); //Numéro du jour
      var mois = maDate.getMonth(); //Mois (commence à 0, donc +1)
      var annee = maDate.getFullYear(); //Année sur 2 chiffres ou getFullYear sur 4
  
      var resultDate = njour + " " + monthName[mois] + " " + annee;
      return resultDate;
    }
  
    initDatatable(table);
  
    // Modal Update
    $(document).on("click", ".editLink", function () {
      // Début de la chaine de Promises
      initializeModal($(this).attr("data-table-type"), $(this).attr("data-id"));
    });
  
    // Requete BDD du/de la post/comment/user/categorie choisi(e)
    function initializeModal(event, id) {
      checkPoint("Début de l'initialisation de la modal d'update");
      var params = new Object();
      const tableToUpdate = event;
      params.action = "getForUpdate";
      params.table = tableToUpdate;
      params.id = id;
      fetch("/fetching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((x) => x.json())
        .then((x) => {
          checkPoint("Requête de la table " + tableToUpdate + " effectuée !");
          loadModal(x, tableToUpdate).then((loadModalResponse) => {
            // Création et ajout dans le DOM des champs (avec valeurs) d'update de la modal
            initEditor(loadModalResponse); // Initialisation de l'éditeur WYSIWYG TinyMCE
          });
        });
    }
  
    // Changer les states au clic de l'icone de visibilité
    $(document).on("click", ".toggleStateBtn", function () {
      var initialState = parseInt($(this).attr("data-value"));
      var newState = initialState == 1 ? 0 : 1;
      var tableForToggle = $(this).attr("data-table");
      var idToToggle = $(this).attr("data-id");
      var columnForToggle = $(this).attr("data-column");
      checkPoint(
        "Changement de visibilité:  Actuelle: " +
          initialState +
          " => Nouvelle: " +
          newState
      );
  
      var params = new Object();
      params.action = "UPDATE";
      params.table = "post"; //tableForToggle;
      params.what = columnForToggle.toLowerCase();
      params.id = idToToggle; //parseInt(idToToggle);
      params.message = "updateState";
      params.newValue = newState;
      fetch("/fetching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((x) => x.json())
        .then((x) => {
          var feedback =
            x.message == "SUCCESS."
              ? "Changement de visibilité effectué => Nouvelle visibilité: " +
                newState
              : "ERREUR lors de la modification de la visibilité";
          checkPoint(feedback);
          //$("li[data-table='Post']").click();
          //TO DO : redraw datatable
        });
    });
  

  
    //Initialisation de dataTable avec des paramètres personnalisés
    if ($.fn.dataTable) {
      $.extend($.fn.dataTable.defaults, {
        language: {
          sEmptyTable: "Aucune donnée disponible dans le tableau",
          sInfo: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
          sInfoEmpty: "Affichage de l'élément 0 à 0 sur 0 élément",
          sInfoFiltered: "(filtré à partir de _MAX_ éléments au total)",
          sInfoPostFix: "",
          sInfoThousands: ",",
          sLengthMenu: "Afficher _MENU_ éléments",
          sLoadingRecords: "Chargement...",
          sProcessing: "Traitement...",
          sSearch: "Rechercher :",
          sZeroRecords: "Aucun élément correspondant trouvé",
          oPaginate: {
            sFirst: "Premier",
            sLast: "Dernier",
            sNext: "Suivant",
            sPrevious: "Précédent",
          },
          oAria: {
            sSortAscending: ": activer pour trier la colonne par ordre croissant",
            sSortDescending:
              ": activer pour trier la colonne par ordre décroissant",
          },
          select: {
            rows: {
              _: "%d lignes sélectionnées",
              0: "Aucune ligne sélectionnée",
              1: "1 ligne sélectionnée",
            },
          },
        },
      });
    }
  });
  
  // Fonction pour générer le html du formulaire d'update dans la modal
  const loadModal = function (x, tableToUpdate) {
    checkPoint("Début création du HTML de la modal d'update");
    return new Promise(function (resolve, reject) {
      $("#updateForm").html("");
      var formContent = "";
      var textarea = "";
      var textareaContent = "";
      Object.entries(formInputs[tableToUpdate]).forEach(([input, data]) => {
        if (formInputs[`${tableToUpdate}`][`${input}`].type == "textarea") {
          textareaContent = x[`${tableToUpdate}`][0][`${input}`];
          textarea =
            `<div class="form-group w-100">
          <label for="` +
            input +
            `">` +
            input +
            `</label>
          <textarea class="form-control" name="` +
            input +
            `" id="textareaContent">` +
            textareaContent +
            `</textarea></div>`;
          $("#updateForm").append(textarea); // Ajout dans la modal (en première position) du textarea
        } else if (formInputs[`${tableToUpdate}`][`${input}`].type == "select") {
          var options = "";
          var tableSelect = formInputs[`${tableToUpdate}`][`${input}`].table;
          x.Category.forEach((element) => {
            // On select l'option enregistrée en BDD
            var selected =
              element.ID == x[`${tableToUpdate}`][0].CategoryID ? "selected" : "";
            options +=
              `<option value="` +
              element.ID +
              `" ` +
              selected +
              `>` +
              element.Name +
              `</option>`;
          });
          formContent +=
            `<div class="form-group">
          <label for="` +
            input +
            `">` +
            input +
            `</label>
          <select class="form-control" name="` +
            input +
            `">
          ` +
            options +
            `
          </select>
          </div>`;
        } else {
          formContent +=
            `<div class="form-group">
            <label for="` +
            input +
            `">` +
            input +
            `</label>
            <input class="form-control" type="` +
            formInputs[`${tableToUpdate}`][`${input}`].type +
            `" name="` +
            input +
            `" value="` +
            x[`${tableToUpdate}`][0][`${input}`] +
            `"></div>`;
        }
      });
  
      // Ajout du titre dans la modal
      $(".modal-title").html(
        "UPDATE " + tableToUpdate.toUpperCase() + " N°" + $(this).attr("data-id")
      );
  
      // AJout des champs autres que le textarea
      $("#updateForm").prepend(formContent);
  
      // On resolve la Promise pour passer à la suivante
      checkPoint("HTML du formulaire d'update généré et ajouté au DOM !");
      resolve(textareaContent);
    });
  };
  
  // Initialisation de l'éditeur WYSIWYG
  const initEditor = (textareaContent) => {
    // Si une précédente instance existe, on la détruit
    checkPoint("Initialisation de TinyMCE");
    if (tinymce.editors.length > 0) {
      tinymce.EditorManager.execCommand(
        "mceRemoveEditor",
        true,
        "textareaContent"
      );
      tinymce.EditorManager.execCommand("mceAddEditor", true, "textareaContent");
      checkPoint("Destruction des précédentes instances de TinyMCE");
    }
  
    // Initialisation
    tinymce.init({
      menubar: false,
      language: "fr_FR",
      selector: "#textareaContent",
      setup: function (editor) {
        // Confirmation
        editor.on("init", function (e) {
          checkPoint("Editeur TinyMCE initialisé !");
        });
      },
      plugins:
        "autoresize image template textcolor hr importcss link noneditable spellchecker",
      //"lists advlist autoresize charmap emoticons media image template preview textcolor hr importcss link noneditable table help",
      toolbar:
        "fontselect fontsizeselect | bold italic forecolor" +
        "alignleft aligncenter alignright alignjustify | " +
        "imageupload image" +
        "| spellchecker",
      target_list: [
        { title: "Téléchargement", value: "_self" },
        { title: "Nouvel onglet", value: "_blank" },
      ],
      media_live_embeds: true,
      browser_spellcheck: true,
      spellchecker_languages:
        "English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR," +
        "German=de,Italian=it,Polish=pl,Portuguese=pt_BR,Spanish=es,Swedish=sv",
      spellchecker_language: "fr-FR",
      noneditable_noneditable_class: "mceNonEditable",
      branding: false,
      mobile: {
        menubar: true,
      },
      file_picker_types: "file image media",
      images_upload_handler: function (blobInfo, success, failure) {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", "./private/controller/traitement-ajax.php");
        xhr.onload = function () {
          var json;
          if (xhr.status != 200) {
            failure("HTTP Error: " + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
  
          if (!json || typeof json.location != "string") {
            failure("Invalid JSON: " + xhr.responseText);
            return;
          }
          success(json.location);
        };
        formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
      },
  
      file_picker_callback: function (cb, value, meta) {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/* audio/* video/*");
        input.onchange = function () {
          var file = this.files[0];
  
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            var id = "blobid" + new Date().getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
  
            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), {
              title: file.name,
            });
          };
        };
  
        input.click();
      },
      init_instance_callback: function (editor) {
        // Si besoin
      },
    });
  
    $(document).on("focusin", function (e) {
      if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
      }
    });
  };
  
  // Fonction de feedback
  function checkPoint(etape) {
    var now = new Date();
    var annee = now.getFullYear();
    var mois = now.getMonth() + 1;
    var jour = now.getDate();
    var heure = now.getHours();
    var minute = now.getMinutes();
    var seconde = now.getSeconds();
    var millisecondes = now.getMilliseconds();
  
    console.log(
      heure + "h:" + minute + "min:" + seconde + "sec:" + millisecondes + "ms: ",
      etape
    );
  }

*/




  return (
    <>
      <AdminMenu />
    </>
  )
}

export default Admin