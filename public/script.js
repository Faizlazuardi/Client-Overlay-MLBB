// --------------------------------------------------------- script global ---------------------------------------------------------

// Fungsi untuk memuat logo tim dari file lokal
document.querySelectorAll('.file-logo').forEach(input => {
    input.addEventListener('change', function() {
        const imgId = input.id.replace('file-logo-', 'logo-');
        const img = document.getElementById(imgId);
        img.src = URL.createObjectURL(input.files[0]);
    });
});


// Fungsi untuk mengupdate nama tim yang ditampilkan
document.querySelectorAll('.teams').forEach(team => {
    team.addEventListener('input', UpdateTeamName);
});

function UpdateTeamName() {
    document.querySelectorAll('.teams').forEach(team => {
        const teamId = team.id.replace('team-', '');
        const teamName = team.value;
        document.getElementById(`team-name-display-${teamId}`).textContent = teamName;
    });
}

// Fungsi untuk menampilkan atau menyembunyikan gambar berdasarkan checkbox
const checkboxes = document.querySelectorAll('.win-check')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function(){
        const image = document.getElementById(`win-icon-${checkbox.id.replace('win-check-','')}`);
        image.style.display = checkbox.checked ? "block" : "none";
    })
});


// Fungsi untuk menukar semua (nickname pemain, nama tim, gambar tim, dan status checkbox 1-3 dengan 4-6)
document.getElementById('switch-team').addEventListener('click', function() {
    //tukar nickname
    if(document.querySelectorAll('.nickname-field')){
        for (let i = 1; i <= 5; i++) {
            let blue = document.getElementById(`input-${i}`);
            let red = document.getElementById(`input-${i + 5}`);
            [blue.value, red.value] = [red.value, blue.value]
            updateNickname(i);
            updateNickname(i+5);
        };
    }
    
    // Tukar nama tim
    const team1 = document.getElementById('team-1');
    const team2 = document.getElementById('team-2');
    [team1.value, team2.value] = [team2.value, team1.value];
    UpdateTeamName();
    
    // Tukar gambar utama
    const img1 = document.getElementById('logo-1');
    const img2 = document.getElementById('logo-2');
    [img1.src, img2.src] = [img2.src, img1.src];
    
    // Tukar status checkbox dan visibilitas gambar tambahan
    for (let i = 1; i <= 3; i++) {
        const checkbox1 = document.getElementById(`win-check-${i}`);
        const checkbox2 = document.getElementById(`win-check-${i + 3}`);
        const winIcon1 = document.getElementById(`win-icon-${i}`);
        const winIcon2 = document.getElementById(`win-icon-${i + 3}`);
        
        // Tukar status checkbox
        [checkbox1.checked, checkbox2.checked] = [checkbox2.checked, checkbox1.checked];
        
        // Tukar tampilan gambar berdasarkan checkbox
        winIcon1.style.display = checkbox1.checked ? "block" : "none";
        winIcon2.style.display = checkbox2.checked ? "block" : "none";
    }
});


// Fungsi untuk mereset nickname pemain, logo, nama tim, dan checkbox ke kondisi awal
document.getElementById('reset-team').addEventListener('click', function(){
    // Reset nickname
    if(document.querySelectorAll('.nickname-field')){
        ResetNickname()
    }

    //reset nama team
    document.getElementById('team-1').value = "Team 1";
    document.getElementById('team-2').value = "Team 2";
    UpdateTeamName();
    
    // reset logo
    document.getElementById('logo-1').src = "../public/images/80x80.png";
    document.getElementById('logo-2').src = "../public/images/80x80.png";
    
    document.getElementById('file-logo-1').value = "";
    document.getElementById('file-logo-2').value = "";
    
    // Reset checkbox dan gambar tambahan
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`win-check-${i}`).checked = false;
        document.getElementById(`win-icon-${i}`).style.display = "none";
    }
});


// --------------------------------------------------------- script  draft ---------------------------------------------------------

// Custom database lokal (contoh data untuk hero)
const heroes = [
    { name: 'Aamon', pickImg: '../public/HeroPick/aamon.png', banImg: '../public/HeroBan/Aamon.png'},
    { name: 'Akai', pickImg: '../public/HeroPick/akai.png', banImg: '../public/HeroBan/Akai.png' },
    { name: 'Aldous', pickImg: '../public/HeroPick/aldous.png', banImg: '../public/HeroBan/Aldous.png' },
    { name: 'Alice', pickImg: '../public/HeroPick/alice.png', banImg: '../public/HeroBan/Alice.png' },
    { name: 'Alpha', pickImg: '../public/HeroPick/alpha.png', banImg: '../public/HeroBan/Alpha.png' },
    { name: 'Alucard', pickImg: '../public/HeroPick/alucard.png', banImg: '../public/HeroBan/Alucard.png' },
    { name: 'Angela', pickImg: '../public/HeroPick/angela.png', banImg: '../public/HeroBan/Angela.png' },
    { name: 'Argus', pickImg: '../public/HeroPick/argus.png', banImg: '../public/HeroBan/Argus.png' },
    { name: 'Arlot', pickImg: '../public/HeroPick/arlot.png', banImg: '../public/HeroBan/Arlot.png' },
    { name: 'Atlas', pickImg: '../public/HeroPick/atlas.png', banImg: '../public/HeroBan/Atlas.png' },
    { name: 'Aulus', pickImg: '../public/HeroPick/aulus.png', banImg: '../public/HeroBan/Aulus.png' },
    { name: 'Aurora', pickImg: '../public/HeroPick/aurora.png', banImg: '../public/HeroBan/Aurora.png' },
    { name: 'Badang', pickImg: '../public/HeroPick/badang.png', banImg: '../public/HeroBan/Badang.png' },
    { name: 'Balmond', pickImg: '../public/HeroPick/balmond.png', banImg: '../public/HeroBan/Balmond.png' },
    { name: 'Bane', pickImg: '../public/HeroPick/bane.png', banImg: '../public/HeroBan/Bane.png' },
    { name: 'Barats', pickImg: '../public/HeroPick/barats.png', banImg: '../public/HeroBan/Barats.png' },
    { name: 'Baxia', pickImg: '../public/HeroPick/baxia.png', banImg: '../public/HeroBan/Baxia.png' },
    { name: 'Beatrix', pickImg: '../public/HeroPick/beatrix.png', banImg: '../public/HeroBan/Beatrix.png' },
    { name: 'Beleric', pickImg: '../public/HeroPick/beleric.png', banImg: '../public/HeroBan/Beleric.png' },
    { name: 'Benedetta', pickImg: '../public/HeroPick/benedetta.png', banImg: '../public/HeroBan/Benedetta.png' },
    { name: 'Brody', pickImg: '../public/HeroPick/brody.png', banImg: '../public/HeroBan/Brody.png' },
    { name: 'Bruno', pickImg: '../public/HeroPick/bruno.png', banImg: '../public/HeroBan/Bruno.png' },
    { name: 'Carmila', pickImg: '../public/HeroPick/carmila.png', banImg: '../public/HeroBan/Carmila.png' },
    { name: 'Cecilion', pickImg: '../public/HeroPick/cecilion.png', banImg: '../public/HeroBan/Cecilion.png' },
    { name: 'Chang\'e', pickImg: '../public/HeroPick/chang_e.png', banImg: '../public/HeroBan/Change.png' },
    { name: 'Chip', pickImg: '../public/HeroPick/chip.png', banImg: '../public/HeroBan/Chip.png' },
    { name: 'Chou', pickImg: '../public/HeroPick/chou.png', banImg: '../public/HeroBan/Chou.png' },
    { name: 'Cici', pickImg: '../public/HeroPick/cici.png', banImg: '../public/HeroBan/Cici.png' },
    { name: 'Claude', pickImg: '../public/HeroPick/claude.png', banImg: '../public/HeroBan/Claude.png' },
    { name: 'Clint', pickImg: '../public/HeroPick/clint.png', banImg: '../public/HeroBan/Clint.png' },
    { name: 'Cyclops', pickImg: '../public/HeroPick/cyclops.png', banImg: '../public/HeroBan/Cyclops.png' },
    { name: 'Diggie', pickImg: '../public/HeroPick/diggie.png', banImg: '../public/HeroBan/Diggie.png' },
    { name: 'Dyroth', pickImg: '../public/HeroPick/dyroth.png', banImg: '../public/HeroBan/Dyroth.png' },
    { name: 'Edith', pickImg: '../public/HeroPick/edith.png', banImg: '../public/HeroBan/Edith.png' },
    { name: 'Esmeralda', pickImg: '../public/HeroPick/esmeralda.png', banImg: '../public/HeroBan/Esmeralda.png' },
    { name: 'Estes', pickImg: '../public/HeroPick/estes.png', banImg: '../public/HeroBan/Estes.png' },
    { name: 'Eudora', pickImg: '../public/HeroPick/eudora.png', banImg: '../public/HeroBan/Eudora.png' },
    { name: 'Fanny', pickImg: '../public/HeroPick/fanny.png', banImg: '../public/HeroBan/Fanny.png' },
    { name: 'Faramis', pickImg: '../public/HeroPick/faramis.png', banImg: '../public/HeroBan/Faramis.png' },
    { name: 'Floryn', pickImg: '../public/HeroPick/floryn.png', banImg: '../public/HeroBan/Floryn.png' },
    { name: 'Franco', pickImg: '../public/HeroPick/franco.png', banImg: '../public/HeroBan/Franco.png' },
    { name: 'Fredrin', pickImg: '../public/HeroPick/fredrin.png', banImg: '../public/HeroBan/Fredrin.png' },
    { name: 'Freya', pickImg: '../public/HeroPick/freya.png', banImg: '../public/HeroBan/Freya.png' },
    { name: 'Gatotkaca', pickImg: '../public/HeroPick/gatotkaca.png', banImg: '../public/HeroBan/Gatotkaca.png' },
    { name: 'Gloo', pickImg: '../public/HeroPick/gloo.png', banImg: '../public/HeroBan/Gloo.png' },
    { name: 'Gord', pickImg: '../public/HeroPick/gord.png', banImg: '../public/HeroBan/Gord.png' },
    { name: 'Granger', pickImg: '../public/HeroPick/granger.png', banImg: '../public/HeroBan/Granger.png' },
    { name: 'Grock', pickImg: '../public/HeroPick/grock.png', banImg: '../public/HeroBan/Grock.png' },
    { name: 'Guinevere', pickImg: '../public/HeroPick/guinevere.png', banImg: '../public/HeroBan/Guinevere.png' },
    { name: 'Gusion', pickImg: '../public/HeroPick/gusion.png', banImg: '../public/HeroBan/Gusion.png' },
    { name: 'Hanabi', pickImg: '../public/HeroPick/hanabi.png', banImg: '../public/HeroBan/Hanabi.png' },
    { name: 'Hanzo', pickImg: '../public/HeroPick/hanzo.png', banImg: '../public/HeroBan/Hanzo.png' },
    { name: 'Harith', pickImg: '../public/HeroPick/harith.png', banImg: '../public/HeroBan/Harith.png' },
    { name: 'Harley', pickImg: '../public/HeroPick/harley.png', banImg: '../public/HeroBan/Harley.png' },
    { name: 'Hayabusa', pickImg: '../public/HeroPick/hayabusa.png', banImg: '../public/HeroBan/Hayabusa.png' },
    { name: 'Helcurt', pickImg: '../public/HeroPick/helcurt.png', banImg: '../public/HeroBan/Helcurt.png' },
    { name: 'Hilda', pickImg: '../public/HeroPick/hilda.png', banImg: '../public/HeroBan/Hilda.png' },
    { name: 'Hylos', pickImg: '../public/HeroPick/hylos.png', banImg: '../public/HeroBan/Hylos.png' },
    { name: 'Irithel', pickImg: '../public/HeroPick/irithel.png', banImg: '../public/HeroBan/Irithel.png' },
    { name: 'Ixia', pickImg: '../public/HeroPick/ixia.png', banImg: '../public/HeroBan/Ixia.png' },
    { name: 'Jawhead', pickImg: '../public/HeroPick/jawhead.png', banImg: '../public/HeroBan/Jawhead.png' },
    { name: 'Johnson', pickImg: '../public/HeroPick/johnson.png', banImg: '../public/HeroBan/Johnson.png' },
    { name: 'Joy', pickImg: '../public/HeroPick/joy.png', banImg: '../public/HeroBan/Joy.png' },
    { name: 'Julian', pickImg: '../public/HeroPick/julian.png', banImg: '../public/HeroBan/Julian.png' },
    { name: 'Kadita', pickImg: '../public/HeroPick/kadita.png', banImg: '../public/HeroBan/Kadita.png' },
    { name: 'Kagura', pickImg: '../public/HeroPick/kagura.png', banImg: '../public/HeroBan/Kagura.png' },
    { name: 'Kaja', pickImg: '../public/HeroPick/kaja.png', banImg: '../public/HeroBan/Kaja.png' },
    { name: 'Karina', pickImg: '../public/HeroPick/karina.png', banImg: '../public/HeroBan/Karina.png' },
    { name: 'Karrie', pickImg: '../public/HeroPick/karrie.png', banImg: '../public/HeroBan/Karrie.png' },
    { name: 'Khaleed', pickImg: '../public/HeroPick/khaleed.png', banImg: '../public/HeroBan/Khaleed.png' },
    { name: 'Khufra', pickImg: '../public/HeroPick/khufra.png', banImg: '../public/HeroBan/Khufra.png' },
    { name: 'Kimmy', pickImg: '../public/HeroPick/kimmy.png', banImg: '../public/HeroBan/Kimmy.png' },
    { name: 'Lancelot', pickImg: '../public/HeroPick/lancelot.png', banImg: '../public/HeroBan/Lancelot.png' },
    { name: 'Lapu Lapu', pickImg: '../public/HeroPick/lapulapu.png', banImg: '../public/HeroBan/Lapulapu.png' },
    { name: 'Layla', pickImg: '../public/HeroPick/layla.png', banImg: '../public/HeroBan/Layla.png' },
    { name: 'Leomord', pickImg: '../public/HeroPick/leomord.png', banImg: '../public/HeroBan/Leomord.png' },
    { name: 'Lesley', pickImg: '../public/HeroPick/lesley.png', banImg: '../public/HeroBan/Lesley.png' },
    { name: 'Ling', pickImg: '../public/HeroPick/ling.png', banImg: '../public/HeroBan/Ling.png' },
    { name: 'Lolita', pickImg: '../public/HeroPick/lolita.png', banImg: '../public/HeroBan/Lolita.png' },
    { name: 'Lucas', pickImg: '../public/HeroPick/lucas.png', banImg: '../public/HeroBan/Lucas.png' },
    { name: 'Lunox', pickImg: '../public/HeroPick/lunox.png', banImg: '../public/HeroBan/Lunox.png' },
    { name: 'Luo Yi', pickImg: '../public/HeroPick/luoyi.png', banImg: '../public/HeroBan/Luoyi.png' },
    { name: 'Lylia', pickImg: '../public/HeroPick/lylia.png', banImg: '../public/HeroBan/Lylia.png' },
    { name: 'Martis', pickImg: '../public/HeroPick/martis.png', banImg: '../public/HeroBan/Martis.png' },
    { name: 'Masha', pickImg: '../public/HeroPick/masha.png', banImg: '../public/HeroBan/Masha.png' },
    { name: 'Mathilda', pickImg: '../public/HeroPick/mathilda.png', banImg: '../public/HeroBan/Mathilda.png' },
    { name: 'Melissa', pickImg: '../public/HeroPick/melissa.png', banImg: '../public/HeroBan/Melissa.png' },
    { name: 'Minotaur', pickImg: '../public/HeroPick/minotour.png', banImg: '../public/HeroBan/Minotour.png' },
    { name: 'Minsitthar', pickImg: '../public/HeroPick/minsitthar.png', banImg: '../public/HeroBan/Minisitthar.png' },
    { name: 'Miya', pickImg: '../public/HeroPick/miya.png', banImg: '../public/HeroBan/Miya.png' },
    { name: 'Moskov', pickImg: '../public/HeroPick/moskov.png', banImg: '../public/HeroBan/Moskov.png' },
    { name: 'Nana', pickImg: '../public/HeroPick/nana.png', banImg: '../public/HeroBan/Nana.png' },
    { name: 'Natalia', pickImg: '../public/HeroPick/natalia.png', banImg: '../public/HeroBan/Natalia.png' },
    { name: 'Nathan', pickImg: '../public/HeroPick/nathan.png', banImg: '../public/HeroBan/Nathan.png' },
    { name: 'Nolan', pickImg: '../public/HeroPick/nolan.png', banImg: '../public/HeroBan/Nolan.png' },
    { name: 'Novaria', pickImg: '../public/HeroPick/novaria.png', banImg: '../public/HeroBan/Novaria.png' },
    { name: 'Odette', pickImg: '../public/HeroPick/odette.png', banImg: '../public/HeroBan/Odette.png' },
    { name: 'Paquito', pickImg: '../public/HeroPick/paquito.png', banImg: '../public/HeroBan/Paquito.png' },
    { name: 'Parsha', pickImg: '../public/HeroPick/parsha.png', banImg: '../public/HeroBan/Parsha.png' },
    { name: 'Phoveus', pickImg: '../public/HeroPick/phoveus.png', banImg: '../public/HeroBan/Phoveus.png' },
    { name: 'Popol and Kupa', pickImg: '../public/HeroPick/popolandkupa.png', banImg: '../public/HeroBan/Popolandkupa.png' },
    { name: 'Rafaela', pickImg: '../public/HeroPick/rafaela.png', banImg: '../public/HeroBan/Rafaela.png' },
    { name: 'Roger', pickImg: '../public/HeroPick/roger.png', banImg: '../public/HeroBan/Roger.png' },
    { name: 'Ruby', pickImg: '../public/HeroPick/ruby.png', banImg: '../public/HeroBan/Ruby.png' },
    { name: 'Saber', pickImg: '../public/HeroPick/saber.png', banImg: '../public/HeroBan/Saber.png' },
    { name: 'Selena', pickImg: '../public/HeroPick/selena.png', banImg: '../public/HeroBan/Selena.png' },
    { name: 'Silvanna', pickImg: '../public/HeroPick/silvanna.png', banImg: '../public/HeroBan/Silvanna.png' },
    { name: 'Sun', pickImg: '../public/HeroPick/sun.png', banImg: '../public/HeroBan/Sun.png' },
    { name: 'Suyou', pickImg: '../public/HeroPick/suyou.png', banImg: '../public/HeroBan/Suyou.png' },
    { name: 'Terizla', pickImg: '../public/HeroPick/terizla.png', banImg: '../public/HeroBan/Terizla' },
    { name: 'Thamuz', pickImg: '../public/HeroPick/thamuz.png', banImg: '../public/HeroBan/Thamuz.png' },
    { name: 'Tigreal', pickImg: '../public/HeroPick/tigreal.png', banImg: '../public/HeroBan/Tigreal.png' },
    { name: 'Uranus', pickImg: '../public/HeroPick/uranus.png', banImg: '../public/HeroBan/Uranus.png' },
    { name: 'Vale', pickImg: '../public/HeroPick/vale.png', banImg: '../public/HeroBan/Vale.png' },
    { name: 'Valentina', pickImg: '../public/HeroPick/valentina.png', banImg: '../public/HeroBan/Valentina.png' },
    { name: 'Valir', pickImg: '../public/HeroPick/valir.png', banImg: '../public/HeroBan/Valir.png' },
    { name: 'Vexana', pickImg: '../public/HeroPick/vexana.png', banImg: '../public/HeroBan/Vexana.png' },
    { name: 'Wanwan', pickImg: '../public/HeroPick/wanwan.png', banImg: '../public/HeroBan/Wanwan.png' },
    { name: 'Xavier', pickImg: '../public/HeroPick/xavier.png', banImg: '../public/HeroBan/Xavier.png' },
    { name: 'Xborg', pickImg: '../public/HeroPick/xborg.png', banImg: '../public/HeroBan/Xborg.png' },
    { name: 'Yin', pickImg: '../public/HeroPick/yin.png', banImg: '../public/HeroBan/Yin.png' },
    { name: 'Yisunshin', pickImg: '../public/HeroPick/yisunshin.png', banImg: '../public/HeroBan/Yisunshin.png' },
    { name: 'Yuzhong', pickImg: '../public/HeroPick/yuzhong.png', banImg: '../public/HeroBan/Yuzhong.png' },
    { name: 'Yve', pickImg: '../public/HeroPick/yve.png', banImg: '../public/HeroBan/Yve.png' },
    { name: 'Zhask', pickImg: '../public/HeroPick/zhask.png', banImg: '../public/HeroBan/Zhask.png' },
    { name: 'Zhuxin', pickImg: '../public/HeroPick/zhuxin.png', banImg: '../public/HeroBan/Zhuxin.png' },
    { name: 'Zilong', pickImg: '../public/HeroPick/zilong.png', banImg: '../public/HeroBan/Zilong.png' }
];

//  Input pencarian hero
const searchInputs = document.querySelectorAll('.dropdown');
searchInputs?.forEach(searchInput => {
    searchInput.addEventListener('input', function() {
        let id = searchInput.id.replace('search-', '');
        let action = id < 11 ? 'pick' : 'ban';
        filterDropdown(id, action);
    });
});


// Menampilkan dropdown berdasarkan pencarian
function filterDropdown(id, action) {
    const searchInput = document.getElementById(`search-${id}`).value.toLowerCase();
    const dropdownItems = document.getElementById(`dropdown-items-${id}`);
    dropdownItems.innerHTML = ''; // Kosongkan dropdown sebelum ditampilkan
    
    // Filter heroes berdasarkan pencarian
    heroes
        .filter(hero => hero.name.toLowerCase().startsWith(searchInput))
        .forEach(hero => {
            const item = document.createElement('option');
            item.classList.add('dropdown-item');
            item.textContent = hero.name;
            item.onclick = () => UpdateHeroImage(hero, id, action);
            dropdownItems.appendChild(item);
        });
}


// Menampilkan gambar hero yang dipilih dengan animasi saat berubah
function UpdateHeroImage(hero, id, action) {
    const imageDisplay = document.getElementById(`image-display-${id}`);
    const existingImage = imageDisplay.querySelector('img');
    
    id = (action === 'pick') ? ShiftHero(id) : id;
    
    if (existingImage) {
        existingImage.classList.add('fly-out');
        setTimeout(() => {
            DisplayHeroImage(hero, id, action);
        }, 500);
    } else {
        DisplayHeroImage(hero, id, action);
    }
}


// Fungsi untuk meng-update gambar hero dengan animasi fly-in
function DisplayHeroImage(hero, id, action) {
    const imageDisplay = document.getElementById(`image-display-${id}`);
    const imgSrc = action === 'ban' ? hero.banImg : hero.pickImg;
    imageDisplay.innerHTML = `<img src="${imgSrc}" alt="${hero.name}" class="fly-in">`;
    document.getElementById(`search-${id}`).value = hero.name;
    document.getElementById(`dropdown-items-${id}`).innerHTML = ''; // Sembunyikan dropdown
}


// Fungsi untuk up pick hero
function ShiftHero(id) {
    let shiftId = id;
    while (shiftId > 1 && shiftId != 6) {
        shiftId--;
        const existingImage = document.getElementById(`image-display-${shiftId}`).querySelector('img');
        if (existingImage) {
            shiftId++;
            break;
        }
    }
    
    if (shiftId != id) {
        // Hapus input hero saat ini
        const inputHero = document.getElementById(`search-${id}`);
        inputHero.value = '';
        
        document.getElementById(`dropdown-items-${id}`).innerHTML = '' ; //sembunyikan dropdown
        
        // Menukar nickname
        const currentNickname = document.getElementById(`input-${id}`);
        const shiftNickname = document.getElementById(`input-${shiftId}`);
        
        if (currentNickname && shiftNickname) {
            [shiftNickname.value, currentNickname.value] = [currentNickname.value, shiftNickname.value]
            updateNickname(id);
            updateNickname(shiftId);
        }
        return shiftId;
    }
    return id;
}


// Fungsi untuk swap heropick
const swaperElements = document.querySelectorAll('.swaper');
swaperElements?.forEach(swaperElement => {
    swaperElement.addEventListener('click', function SwapHero() {
        const checkboxesBlue = document.querySelectorAll('.blue-swaper');
        const checkboxesRed = document.querySelectorAll('.red-swaper');
        const selectedBlue = Array.from(checkboxesBlue).filter(cb => cb.checked);
        const selectedRed = Array.from(checkboxesRed).filter(cb => cb.checked);
        let id1, id2;
        
        let selectedArray = selectedBlue.length === 2 ? selectedBlue : selectedRed.length === 2 ? selectedRed : null;
        if (selectedArray) {
            id1 = selectedArray[0].id.replace('swap-', '');
            id2 = selectedArray[1].id.replace('swap-', '');
        } else {
            return;
        }
        
        //reset swaper
        const swaper1 = document.getElementById(`swap-${id1}`);
        const swaper2 = document.getElementById(`swap-${id2}`);
        swaper1.checked = false
        swaper2.checked = false
        
        //menukar hero
        const existingImage1 = document.getElementById(`image-display-${id1}`).querySelector('img');
        const existingImage2 = document.getElementById(`image-display-${id2}`).querySelector('img');
        if(existingImage1 && existingImage2){
            //menukar input
            const input1 = document.getElementById(`search-${id1}`);
            const input2 = document.getElementById(`search-${id2}`);
            [input1.value, input2.value] = [input2.value, input1.value]
            
            // Mencari hero berdasarkan nilai input
            const hero1 = heroes.find(hero => hero.name === input1.value);
            const hero2 = heroes.find(hero => hero.name === input2.value);
            
            // Memperbarui gambar hero
            UpdateHeroImage(hero1, id1, 'pick')
            UpdateHeroImage(hero2, id2, 'pick')
        }
    });
});


// Auto close dropdown
document.addEventListener('click', function(event) {
    const searchInputs = document.querySelectorAll('.dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-items');
    
    let isClickInsideInput = Array.from(searchInputs).some(input => input.contains(event.target));
    
    if (!isClickInsideInput) {
        dropdownItems.forEach(dropdown => {
            dropdown.innerHTML = '';
        });
    } else {
        searchInputs.forEach((input, index) => {
            if (input !== event.target) {
                dropdownItems[index].innerHTML = '';
            }
        });
    }
});

// Reset semua dropdown dan input dengan animasi fly-out
document.getElementById('reset-dropdowns')?.addEventListener('click', function() {
    // Pilih semua elemen image-display dan dropdown-items secara bersamaan
    const imageDisplays = document.querySelectorAll('[id^="image-display-"]');
    const searchInputs = document.querySelectorAll('[id^="search-"]');
    const dropdownItems = document.querySelectorAll('[id^="dropdown-items-"]');
    
    // Iterasi setiap elemen yang ditemukan
    imageDisplays.forEach((imageDisplay, index) => {
        const image = imageDisplay.querySelector('img');
        if (image) {
            // Tambahkan kelas animasi fly-out
            image.classList.add('fly-out');
        }
        
        // Hapus nilai input dan dropdown setelah animasi selesai
        setTimeout(() => {
            // Reset nilai input dan dropdown untuk elemen yang bersesuaian
            searchInputs[index].value = '';
            imageDisplay.innerHTML = '';
            dropdownItems[index].innerHTML = '';
        }, 500); // Delay sesuai dengan durasi animasi (0.5 detik)
    });
});


// Fungsi untuk mereset nickname
function ResetNickname() {
    document.querySelectorAll('.nickname-field').forEach(input => {
        input.value = '';
        document.getElementById('output-' + input.id.replace('input-', '')).textContent = '';
    });
};


 // Fungsi untuk mengupdate output nickname
document.querySelectorAll('.nickname-field')?.forEach(input =>{
    const inputElement = document.getElementById(input.id);
    inputElement?.addEventListener('input', function() {
        let id = input.id.replace('input-','')
        updateNickname(id);
    });
})

function updateNickname(id) {
    const inputText = document.getElementById(`input-${id}`).value;
    document.getElementById(`output-${id}`).textContent = inputText;
}


// Fungsi display nama turnament
const tournamentnameInput = document.getElementById('tournament-name-input');
tournamentnameInput?.addEventListener('input', function() {
    const tournamentnameOutput = document.getElementById('tournamentnameOutput');
    tournamentnameOutput.textContent = tournamentnameInput.value;
});


// --------------------------------------------------------- script ingame ---------------------------------------------------------

// Fungsi stopwatch
const display = document.getElementById("timestamp");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

//start button
document.getElementById('start-btn')?.addEventListener('click',function(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 1000);
        isRunning = true;
    }
});

//stop button
document.getElementById('stop-btn')?.addEventListener('click',function(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
});

//reset button
document.getElementById('reset-btn')?.addEventListener('click',function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;    
    display.textContent = "00:00";
});

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    
    display.textContent = `${minutes}:${seconds}`;
};

if (document.querySelector('meta[name="description"]').content === 'MLBB Overlay Ingame') {
    const socket = new WebSocket("ws://localhost:3000/ingame");
    
    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }
            
            const blueTeam = data[0];
            const redTeam = data[1];
            
            document.querySelector(".gold-poin-1").innerText = blueTeam["Gold"] + "K";
            document.querySelector(".kill-poin-1").innerText = blueTeam["Poin"];
            document.querySelector(".turet-poin-1").innerText = blueTeam["Turet"];
            document.querySelector(".turtle-poin-1").innerText = blueTeam["Turtle"];
            document.querySelector(".lord-poin-1").innerText = blueTeam["Lord"];
            document.querySelector(".gold-poin-2").innerText = redTeam["Gold"] + "K";
            document.querySelector(".kill-poin-2").innerText = redTeam["Poin"];
            document.querySelector(".turet-poin-2").innerText = redTeam["Turet"];
            document.querySelector(".turtle-poin-2").innerText = redTeam["Turtle"];
            document.querySelector(".lord-poin-2").innerText = redTeam["Lord"];
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    };
}