// Data event (contoh 1-10)
const events = [
  {
    name: "Festival Musik Nusantara",
    date: "15 Juni 2025",
    lokasi: "Yogyakarta",
    harga: 75000,
    image: "../img/candi.jpg",
    stok: 20
  },
  {
    name: "Pentas Budaya Sunda",
    date: "18 Juni 2025",
    lokasi: "Bandung",
    harga: 65000,
    image: "../img/candi.jpg",
    stok: 15
  },
  {
    name: "Jazz Malam Minggu",
    date: "22 Juni 2025",
    lokasi: "Jakarta",
    harga: 95000,
    image: "../img/candi.jpg",
    stok: 0
  },
  {
    name: "Teater Wayang Kulit",
    date: "25 Juni 2025",
    lokasi: "Solo",
    harga: 50000,
    image: "../img/candi.jpg",
    stok: 8
  },
  {
    name: "Konser Indie Lokal",
    date: "30 Juni 2025",
    lokasi: "Malang",
    harga: 85000,
    image: "../img/candi.jpg",
    stok: 25
  },
  {
    name: "Tari Tradisional Bali",
    date: "1 Juli 2025",
    lokasi: "Denpasar",
    harga: 60000,
    image: "../img/candi.jpg",
    stok: 12
  },
  {
    name: "Dangdut Koplo Fest",
    date: "4 Juli 2025",
    lokasi: "Surabaya",
    harga: 70000,
    image: "../img/candi.jpg",
    stok: 30
  },
  {
    name: "Pagelaran Angklung",
    date: "6 Juli 2025",
    lokasi: "Bandung",
    harga: 40000,
    image: "../img/candi.jpg",
    stok: 18
  },
  {
    name: "Festival Musik Elektronik",
    date: "10 Juli 2025",
    lokasi: "Jakarta",
    harga: 120000,
    image: "../img/candi.jpg",
    stok: 10
  },
  {
    name: "Opera Batak",
    date: "12 Juli 2025",
    lokasi: "Medan",
    harga: 55000,
    image: "../img/candi.jpg",
    stok: 5
  },
  {
    name: "Festival Musik Nusantara",
    date: "15 Juni 2025",
    lokasi: "Yogyakarta",
    harga: 75000,
    image: "../img/candi.jpg",
    stok: 20
  },
  {
    name: "Pentas Budaya Sunda",
    date: "18 Juni 2025",
    lokasi: "Bandung",
    harga: 65000,
    image: "../img/candi.jpg",
    stok: 15
  },
  {
    name: "Jazz Malam Minggu",
    date: "22 Juni 2025",
    lokasi: "Jakarta",
    harga: 95000,
    image: "../img/candi.jpg",
    stok: 0
  },
  {
    name: "Teater Wayang Kulit",
    date: "25 Juni 2025",
    lokasi: "Solo",
    harga: 50000,
    image: "../img/candi.jpg",
    stok: 8
  },
  {
    name: "Konser Indie Lokal",
    date: "30 Juni 2025",
    lokasi: "Malang",
    harga: 85000,
    image: "../img/candi.jpg",
    stok: 25
  },
  {
    name: "Tari Tradisional Bali",
    date: "1 Juli 2025",
    lokasi: "Denpasar",
    harga: 60000,
    image: "../img/candi.jpg",
    stok: 12
  },
  {
    name: "Dangdut Koplo Fest",
    date: "4 Juli 2025",
    lokasi: "Surabaya",
    harga: 70000,
    image: "../img/candi.jpg",
    stok: 30
  },
  {
    name: "Pagelaran Angklung",
    date: "6 Juli 2025",
    lokasi: "Bandung",
    harga: 40000,
    image: "../img/candi.jpg",
    stok: 18
  },
  {
    name: "Festival Musik Elektronik",
    date: "10 Juli 2025",
    lokasi: "Jakarta",
    harga: 120000,
    image: "../img/candi.jpg",
    stok: 10
  },
  {
    name: "Opera Batak",
    date: "12 Juli 2025",
    lokasi: "Medan",
    harga: 55000,
    image: "../img/candi.jpg",
    stok: 5
  }
  
];

let cart = [];
let totalHarga = 0;

function toRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function generateEventList() {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  events.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${event.image}" alt="${event.name}" />
      <p class="nama"<strong>${event.name}</strong></p>
      <p class="lokasi">${event.date} - ${event.lokasi}</p>
      <p class="harga">Rp ${toRupiah(event.harga)},00</p>
      <h4 class="stok">Stok: ${event.stok}</h4>
      <button onclick="addToCart(${index})" ${event.stok <= 0 ? "disabled" : ""}>
        <i class='fas fa-ticket-alt'></i> Pesan Tiket
      </button>
    `;
    eventList.appendChild(card);
  });
}

function addToCart(index) {
  const selected = events[index];
  if (selected.stok <= 0) {
    alert("Stok habis!");
    return;
  }

  const existing = cart.find(item => item.name === selected.name);
  if (existing) {
    if (existing.jumlah < selected.stok) {
      existing.jumlah++;
      totalHarga += selected.harga;
    } else {
      alert("Stok tidak mencukupi.");
    }
  } else {
    cart.push({ ...selected, jumlah: 1 });
    totalHarga += selected.harga;
  }
  renderCart();
}

function removeFromCart(index) {
  const item = cart[index];
  totalHarga -= item.harga;
  item.jumlah--;
  if (item.jumlah <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.style.display = "none";
    return;
  }

  cartList.style.display = "inline-block";

  const totalDiv = document.createElement("div");
  totalDiv.className = "total";
  totalDiv.innerHTML = `<h1>Total: Rp. ${toRupiah(totalHarga)},00</h1><hr>`;
  cartList.appendChild(totalDiv);

  cart.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card-order";
    card.innerHTML = `
      <div class="detail">
        <img src="${item.image}" alt="${item.name}" />
        <p>${item.name}</p>
        <span>${item.jumlah}</span>
      </div>
      <button onclick="removeFromCart(${i})">
        <i class="fas fa-trash"></i> Hapus
      </button>
    `;
    cartList.appendChild(card);
  });

  const finish = document.createElement("div");
  finish.className = "card-finish";
  finish.innerHTML = `<button onclick="orderEvent()">PESAN SEKARANG</button>`;
  cartList.appendChild(finish);
}

function orderEvent() {
  cart.forEach(item => {
    const event = events.find(ev => ev.name === item.name);
    if (event) {
      event.stok -= item.jumlah;
    }
  });
  alert(`Tiket berhasil dipesan! Total: Rp ${toRupiah(totalHarga)},00`);
  cart = [];
  totalHarga = 0;
  renderCart();
  generateEventList();
}

document.addEventListener("DOMContentLoaded", generateEventList);