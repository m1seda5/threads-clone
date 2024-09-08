// version one without language switcher
// import { Button, Text } from "@chakra-ui/react";
// import useShowToast from "../hooks/useShowToast";
// import useLogout from "../hooks/useLogout";

// export const SettingsPage = () => {
// 	const showToast = useShowToast();
// 	const logout = useLogout();

// 	const freezeAccount = async () => {
// 		if (!window.confirm("Are you sure you want to freeze your account?")) return;

// 		try {
// 			const res = await fetch("/api/users/freeze", {
// 				method: "PUT",
// 				headers: { "Content-Type": "application/json" },
// 			});
// 			const data = await res.json();

// 			if (data.error) {
// 				return showToast("Error", data.error, "error");
// 			}
// 			if (data.success) {
// 				await logout();
// 				showToast("Success", "Your account has been frozen", "success");
// 			}
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};

// 	return (
// 		<>
// 			<Text my={1} fontWeight={"bold"}>
// 				Freeze Your Account
// 			</Text>
// 			<Text my={1}>You can unfreeze your account anytime by logging in.</Text>
// 			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
// 				Freeze
// 			</Button>
// 		</>
// 	);
// };


// version 2 working version with change of langauge feature 
// import React from 'react';
// import { Button, Text } from '@chakra-ui/react';
// import useShowToast from '../hooks/useShowToast';
// import useLogout from '../hooks/useLogout';
// import i18n from '../i18n'; // Import i18n

// export const SettingsPage = () => {
//   const showToast = useShowToast();
//   const logout = useLogout();

//   const freezeAccount = async () => {
//     if (!window.confirm(i18n.t("Are you sure you want to freeze your account?"))) return;

//     try {
//       const res = await fetch('/api/users/freeze', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await res.json();

//       if (data.error) {
//         return showToast('Error', data.error, 'error');
//       }
//       if (data.success) {
//         await logout();
//         showToast('Success', i18n.t('Your account has been frozen'), 'success');
//       }
//     } catch (error) {
//       showToast('Error', error.message, 'error');
//     }
//   };

//   const handleLanguageChange = (lng) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem('language', lng);
//   };

//   return (
//     <>
//       <Text my={1} fontWeight={'bold'}>
//         {i18n.t('Freeze Your Account')}
//       </Text>
//       <Text my={1}>
//         {i18n.t('You can unfreeze your account anytime by logging in.')}
//       </Text>
//       <Button size={'sm'} colorScheme='red' onClick={freezeAccount}>
//         {i18n.t('Freeze')}
//       </Button>
//       <Button onClick={() => handleLanguageChange('en')}>English</Button>
//       <Button onClick={() => handleLanguageChange('zh')}>中文</Button>
//     </>
//   );
// };

// version 3   pauseeeeeee this is woring witht the langauge changer butons only working in the settings thoughb
// import React from 'react';
// import { Button, Text, Spinner } from '@chakra-ui/react';
// import useShowToast from '../hooks/useShowToast';
// import useLogout from '../hooks/useLogout';
// import i18n from '../i18n'; // Import i18n

// export const SettingsPage = () => {
//   const showToast = useShowToast();
//   const logout = useLogout();
//   const [loading, setLoading] = React.useState(false);

//   const freezeAccount = async () => {
//     if (!window.confirm(i18n.t("Are you sure you want to freeze your account?"))) return;

//     try {
//       const res = await fetch('/api/users/freeze', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await res.json();

//       if (data.error) {
//         return showToast('Error', data.error, 'error');
//       }
//       if (data.success) {
//         await logout();
//         showToast('Success', i18n.t('Your account has been frozen'), 'success');
//       }
//     } catch (error) {
//       showToast('Error', error.message, 'error');
//     }
//   };

//   const handleLanguageChange = (lng) => {
//     setLoading(true);
//     i18n.changeLanguage(lng).then(() => {
//       localStorage.setItem('language', lng);
//       setLoading(false);
//     });
//   };

//   return (
//     <>
//       <Text my={1} fontWeight={'bold'}>
//         {i18n.t('Freeze Your Account')}
//       </Text>
//       <Text my={1}>
//         {i18n.t('You can unfreeze your account anytime by logging in.')}
//       </Text>
//       <Button size={'sm'} colorScheme='red' onClick={freezeAccount}>
//         {i18n.t('Freeze')}
//       </Button>
//       {loading ? (
//         <Spinner size="sm" />
//       ) : (
//         <>
//           <Button
//             onClick={() => handleLanguageChange('en')}
//             mx={2} // Add horizontal spacing
//             _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }} // Add hover animation
//           >
//             English
//           </Button>
//           <Button
//             onClick={() => handleLanguageChange('zh')}
//             mx={2} // Add horizontal spacing
//             _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }} // Add hover animation
//           >
//             中文
//           </Button>
//         </>
//       )}
//     </>
//   );
// };



// slight update to th settings for the langauge changer 
import React from 'react';
import { Button, Text, Spinner } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';
import useLogout from '../hooks/useLogout';
import i18n from '../i18n'; // Import i18n

export const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();
  const [loading, setLoading] = React.useState(false);

  const freezeAccount = async () => {
    if (!window.confirm(i18n.t("Are you sure you want to freeze your account?"))) return;

    try {
      const res = await fetch('/api/users/freeze', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) {
        return showToast('Error', data.error, 'error');
      }
      if (data.success) {
        await logout();
        showToast('Success', i18n.t('Your account has been frozen'), 'success');
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  const handleLanguageChange = (lng) => {
    setLoading(true);
    i18n.changeLanguage(lng).then(() => {
      localStorage.setItem('language', lng);
      setLoading(false);
    });
  };

  return (
    <>
      <Text my={1} fontWeight={'bold'}>
        {i18n.t('Freeze Your Account')}
      </Text>
      <Text my={1}>
        {i18n.t('You can unfreeze your account anytime by logging in.')}
      </Text>
      <Button size={'sm'} colorScheme='red' onClick={freezeAccount}>
        {i18n.t('Freeze')}
      </Button>
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <>
          <Button
            onClick={() => handleLanguageChange('en')}
            mx={2}
            _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }}
          >
            English
          </Button>
          <Button
            onClick={() => handleLanguageChange('zh')}
            mx={2}
            _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }}
          >
            中文
          </Button>
        </>
      )}
    </>
  );
};
