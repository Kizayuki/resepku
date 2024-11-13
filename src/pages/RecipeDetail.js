import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const recipes = [
  {
    id: 1,
    title: 'Nasi Goreng Sederhana',
    description: 'Nasi goreng sederhana dengan bumbu khas Indonesia.',
    ingredients: [
      "1 piring nasi putih",
      "2 siung bawang putih, cincang halus",
      "Kecap manis secukupnya",
      "Saus sambal secukupnya",
      "Saus tiram secukupnya",
      "Garam secukupnya",
      "Kaldu bubuk secukupnya",
      "1 batang daun bawang, cincang halus",
      "1 butir telur ayam",
      "1 buah sosis ayam, iris tipis",
      "3 sdm minyak goreng"
    ],
    steps: [
      "Siapkan penggorengan dengan api sedang, tuang margarin atau minyak goreng.",
      "Masukkan bawang putih dan daun bawang yang sudah dicincang halus.",
      "Tumis hingga berbau harum atau hingga warnanya keemasan.",
      "Masukkan sosis dan satu butir telur ayam. Tumis sebentar.",
      "Masukkan bumbu halus dan nasi. Aduk hingga tercampur rata.",
      "Tuang kecap manis, saus sambal, saus tiram, garam, dan kaldu bubuk.",
      "Aduk hingga warna nasi berubah secara merata.",
      "Nasi goreng yang sederhana dan enak pun siap disajikan."
    ],
    image_url: '/images/nasi goreng.jpg'
  },

  {
    id: 2,
    title: 'Sosis Bakar Praktis',
    description: 'Sosis bakar yang enak dan mudah dibuat, cocok untuk merayakan tahun baru.',
    ingredients: [
      "3-5 sosis",
      "4 sdm margarin",
      "3 sdm kecap",
      "1 sdt lada bubuk",
      "Sedikit air"
    ],
    steps: [
      "Tusuk sosis dengan tusukan sate kemudian kerat kedua sisinya.",
      "Campurkan kecap, lada bubuk dan sedikit air untuk bumbu olesnya.",
      "Oleskan sosis dengan margarin.",
      "Bakar sampai margarin leleh.",
      "Angkat dan olesi dengan bumbu.",
      "Bakar lagi sampai matang kecoklatan.",
      "Sosis bakar pun siap disajikan"
    ],
    image_url: '/images/sosis.jpg'
  },

  {
    id: 3,
    title: 'Ayam Goreng Praktis',
    description: 'Ayam goreng lezat dengan rasa gurih, cocok untuk dimakan kapan saja.',
    ingredients: [
      "1 kg ayam",
      "1 bungkus bumbu racik ayam goreng",
      "200 ml air",
      "Minyak untuk menggoreng"
    ],
    steps: [
      "Masukkan ayam dan bumbu raciknya kedalam wajan.",
      "Tambahkan air, lalu masak ungkep dengan api kecil.",
      "Masak hingga airnya surut dan siap goreng hingga kecoklatan, angkat dan tiriskan.",
      "Ayam goreng pun siap disajikan."
    ],
    image_url: '/images/ayam.jpg'
  },

  {
    id: 4,
    title: 'Japannese Oyakodon Simple',
    description: 'Masakan telur khas jepang yang mudah dibuat.',
    ingredients: [
      "300-500 gr ayam",
      "3 butir telur kocok",
      "1 buah bawang bombay",
      "1 sdm saus teriyaki",
      "Secukupnya kecap manis",
      "Secukupnya saus tiram",
      "Secukupnya minyak wijen",
      "Secukupnya gula garam",
      "Sedikit air"
    ],
    steps: [
      "Potong dadu ayam, dan marinasi sesuai selera. (Sedikit saran direndam susu uht semalaman biar makin empuk).",
      "Boleh juga dimarinasi garam dan lada putih saja.",
      "Keesokan harinya tumis dengan bawang bombay sampai wangi.",
      "Tambahkan sedikit air, masukkan saus teriyaki, kecap manis, saus tiram, minyak wijen, gula dan garam secukupnya. Aduk rata.",
      "Kocok lepas telur. Tuang ke tumisan yang sudah mendidih, tutup dengan tutupan teflon supaya kematangan telur nya merata.",
      "Japanese Oyakodon pun siap disajikan."
    ],
    image_url: '/images/oyakodon.jpg'
  },

  {
    id: 5,
    title: 'Donat Simple',
    description: 'Donat yang mudah dibuat tanpa mixer.',
    ingredients: [
      "250 gram terigu",
      "4 sdm maizena",
      "4 sdm margarin",
      "1 butir telur",
      "1 sdm ragi instan",
      "3 sdm gula pasir",
      "10 sdm air"
    ],
    steps: [
      "Sediakan 10 sdm air hangat. Tambahkan gula dan ragi instan. Aduk² lalu tutup dan diamkan 10 menit sampai ragi aktif.",
      "Setelah aktif, masukan telur, margarin yang sudah dicairkan, maizena dan terigu.",
      "Campurkan sampai kalis merata. Lalu tutup dan diamkan 30 menit (sampai mengembang 2x lipat).",
      "Bentuk donat sesuai selera. Tutup dan diamkan 20 menit.",
      "Pipihkan adonan, mau dilubangi tengahnya juga boleh. Diamkan lagi 20 menit.",
      "Panaskan minyak sampai hangat, goreng donat dengan api sedang cenderung kecil.",
      "Donat pun siap disajikan"
    ],
    image_url: '/images/donat.jpg'
  }
];

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((item) => item.id === parseInt(id));
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!recipe) return <p>Resep tidak ditemukan.</p>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>
          <Card.Img variant="top" src={recipe.image_url} alt={recipe.title} />
          <h5>Bahan-bahan:</h5>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h5>Langkah-langkah:</h5>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <Button variant="link" onClick={() => toggleFavorite(recipe)}>
            {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetail;