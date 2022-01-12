$(document).ready(function () {
    showAllParties();
});

function showAllParties() {
    let user_id = $('#user_id').val()
    let user_mbti = $('#user_mbti').val()

    $.ajax({
        type: 'GET',
        url: '/api/party_list',
        data: {},
        success: function (response) {
            let parties = response['parties']

            if (parties.length === 0) {
                html = `
                            <div class="party-card card w-100">
                                <div class="card-body">찾으시는 결과가 없습니다🤣</div>
                            </div>
                    `
                $('#party-list').append(html);
            } else {
                for (let i = 0; i < parties.length; i++) {
                    let id = parties[i]['id']
                    let purpose = parties[i]['purpose']
                    let title = parties[i]['title']
                    let desc = parties[i]['description']
                    let master_id = parties[i]['master_id']
                    let favorite_mbti = parties[i]['favorite_mbti'].split(",")
                    let


                    if (favorite_mbti.includes(user_mbti) || master_id === user_id) {
                        html = `    
                        <div class="party-card card w-100">
                            <div class="card-body">
                                <h5 class="card-title">${title} | ${purpose}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="/detail?id=${id}" class="join-btn btn btn-primary float--right">입장</a>
                            </div>
                        </div>
                    `
                    } else {
                        html = `    
                        <div class="party-card card w-100">
                            <div class="card-body">
                                <h5 class="card-title">${title} | ${purpose}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="/" onclick="showNotAllowedMessage();return false" class="denied-btn btn btn-secondary float--right">입장</a>
                            </div>
                        </div>
                    `
                    }
                    $('#party-list').append(html);
                }
            }
        }
    });
}

function showSortedParties(category) {
    $.ajax({
        type: 'GET',
        url: '/api/sorted_party_list?cat='.concat(category),
        data: {},
        success: function (response) {
            $('#party-list').empty();

            let user_id = $('#user_id').val()
            let user_mbti = $('#user_mbti').val()
            let parties = response['parties']

            if (parties.length === 0) {
                html = `
                            <div class="party-card card w-100">
                                <div class="card-body">찾으시는 결과가 없습니다🤣</div>
                            </div>
                    `
                $('#party-list').append(html);
            } else {
                for (let i = 0; i < parties.length; i++) {
                    let id = parties[i]['id']
                    let purpose = parties[i]['purpose']
                    let title = parties[i]['title']
                    let desc = parties[i]['description']
                    let master_id = parties[i]['master_id']
                    let favorite_mbti = parties[i]['favorite_mbti'].split(",")
                    let member_mbti = parties[i]['member_info'].split(",")

                    if (favorite_mbti.includes(user_mbti) || master_id === user_id) {
                        html = `    
                        <div class="party-card card w-100">
                            <div class="card-body">
                                <h5 class="card-title">${title} | ${purpose}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="/detail?id=${id}" class="join-btn btn btn-primary float--right">입장</a>
                            </div>
                        </div>
                    `
                    } else {
                        html = `    
                        <div class="party-card card w-100">
                            <div class="card-body">
                                <h5 class="card-title">${title} | ${purpose}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="/" onclick="showNotAllowedMessage();return false" class="denied-btn btn btn-secondary float--right">입장</a>
                            </div>
                        </div>
                    `
                    }
                    $('#party-list').append(html);
                }
            }
        }
    })
}

function showAllowedParties() {
    let user_id = $('#user_id').val()
    let user_mbti = $('#user_mbti').val()

    $.ajax({
        type: 'GET',
        url: '/api/allowed_party_list?mbti='.concat(user_mbti),
        data: {},
        success: function (response) {
            $('#party-list').empty();

            let parties = response['parties']

            if (parties.length === 0) {
                html = `
                            <div class="party-card card w-100">
                                <div class="card-body">찾으시는 결과가 없습니다🤣</div>
                            </div>
                    `
                $('#party-list').append(html);
            } else {
                for (let i = 0; i < parties.length; i++) {
                    let id = parties[i]['id']
                    let purpose = parties[i]['purpose']
                    let title = parties[i]['title']
                    let desc = parties[i]['description']
                    let master_id = parties[i]['master_id']
                    let favorite_mbti = parties[i]['favorite_mbti'].split(",")

                    if (favorite_mbti.includes(user_mbti) || master_id === user_id) {
                        html = `    
                        <div class="party-card card w-100">
                            <div class="card-body">
                                <h5 class="card-title">${title} | ${purpose}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="/detail?id=${id}" class="join-btn btn btn-primary float--right">입장</a>
                            </div>
                        </div>
                    `
                    } else {
                        html = `    
                        <div class="party-card card w-100">
                            <div class="card-body">
                                <h5 class="card-title">${title} | ${purpose}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="/" onclick="showNotAllowedMessage();return false" class="denied-btn btn btn-secondary float--right">입장</a>
                            </div>
                        </div>
                    `
                    }
                    $('#party-list').append(html);
                }
            }
        }
    })
}

function showNotAllowedMessage() {
    alert("여기 파티에서는 당신을 원하지 않아요🤣")
}

function calMbtiRelResult(member_info) {
    let user_mbti = $('#user_mbti').val()
    let member_mbti = []
    if (member_info.indexOf(";") === -1) {
        member_mbti.push([member_info.split(",")[0]])
    } else {
        let arr = member_info.split(";")
        for (i=0 ; i < arr.length; i++) {
            member_mbti.push(arr[i])
        }
    }

    $.ajax({
        type: 'POST',
        url: '/api/allowed_party_list?mbti='.concat(user_mbti),
        data: {'mbti_arr_request': member_mbti,'user_mbti_request':user_mbti},
        success: function (response) {
            average_score = response['average_score']
        }
    })

    return average_score
}

