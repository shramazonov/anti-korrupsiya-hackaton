export const avatarColors = ['#4f46e5', '#0891b2', '#059669', '#dc2626', '#d97706', '#7c3aed', '#db2777']

export function getInitials(name) {
  const parts = name.trim().split(' ')
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0]
}

export const employeesByCategory = {
  'Buxgalteriya': [
    { id: 1, name: 'Karimov Bobur Salimovich', position: 'Bosh buxgalter', photo: 'src/images/1.jpg', category: 'Buxgalteriya' },
    { id: 2, name: 'Toshmatova Dilnoza Hamidovna', position: 'Buxgalter', photo: 'src/images/5.jpg', category: 'Buxgalteriya' },
    { id: 3, name: 'Yusupov Sardor Nematovich', position: 'Buxgalter-iqtisodchi', photo: 'src/images/3.jpg', category: 'Buxgalteriya' },
    { id: 4, name: 'Rahimova Gulnora Baxtiyorovna', position: 'Moliyachi', photo: 'src/images/7.jpg', category: 'Buxgalteriya' },
  ],
  'Ofis registrator': [
    { id: 5, name: 'Nazarov Otabek Farhodovich', position: 'Katta registrator', photo: 'src/images/4.jpg', category: 'Ofis registrator' },
    { id: 6, name: 'Mirzayeva Zulfiya Baxromovna', position: 'Registrator', photo: 'src/images/5.jpg', category: 'Ofis registrator' },
    { id: 7, name: 'Xolmatov Jasur Ilhomovich', position: 'Registrator yordamchisi', photo: 'src/images/2.jpg', category: 'Ofis registrator' },
  ],
  'Fizika kafedrasi': [
    { id: 8, name: 'Abdullayev Sherzod Rustamovich', position: 'Kafedra mudiri', photo: 'src/images/3.jpg', category: 'Fizika kafedrasi' },
    { id: 9, name: 'Normatova Feruza Mansurovna', position: 'Dotsent', photo: 'src/images/5.jpg', category: 'Fizika kafedrasi' },
    { id: 10, name: "Qodirov Ulmas Bahodir o'g'li", position: "O'qituvchi", photo: 'src/images/4.jpg', category: 'Fizika kafedrasi' },
    { id: 11, name: 'Hamidov Firdavs Tohirovich', position: 'Assistent', photo: 'src/images/2.jpg', category: 'Fizika kafedrasi' },
  ],
  'Matemadika kafedrasi': [
    { id: 12, name: 'Ergashev Mansur Aliyevich', position: 'Kafedra mudiri', photo: 'src/images/1.jpg', category: 'Matemadika kafedrasi' },
    { id: 13, name: 'Saidova Barno Hamroyevna', position: 'Professor', photo: 'src/images/5.jpg', category: 'Matemadika kafedrasi' },
    { id: 14, name: 'Tursunov Bekzod Sobirovich', position: 'Dotsent', photo: 'src/images/3.jpg', category: 'Matemadika kafedrasi' },
    { id: 15, name: "Xasanova Nilufar Davronovna", position: "O'qituvchi", photo: 'src/images/9.jpg', category: 'Matemadika kafedrasi' },
  ],
  'Filologiya fakulteti': [
    { id: 16, name: 'Mamatova Shahnoza Botirovna', position: 'Dekan', photo: 'src/images/8.jpg', category: 'Filologiya fakulteti' },
    { id: 17, name: "Holiqov Jahongir Muxtorovich", position: "Dekan o'rinbosari", photo: 'src/images/4.jpg', category: 'Filologiya fakulteti' },
    { id: 18, name: 'Rashidova Mohira Ismoilovna', position: 'Dotsent', photo: 'src/images/7.jpg', category: 'Filologiya fakulteti' },
    { id: 19, name: 'Yunusov Akbar Hamidullayevich', position: "O'qituvchi", photo: 'src/images/4.jpg', category: 'Filologiya fakulteti' },
  ],
}

export const categoryList = Object.keys(employeesByCategory)
