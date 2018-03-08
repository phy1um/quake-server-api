var usStates = [
	{
	"name": "Alabama",
	"abbreviation": "AL"
	},
	{
	"name": "Alaska",
	"abbreviation": "AK"
	},
	{
	"name": "American Samoa",
	"abbreviation": "AS"
	},
	{
	"name": "Arizona",
	"abbreviation": "AZ"
	},
	{
	"name": "Arkansas",
	"abbreviation": "AR"
	},
	{
	"name": "California",
	"abbreviation": "CA"
	},
	{
	"name": "Colorado",
	"abbreviation": "CO"
	},
	{
	"name": "Connecticut",
	"abbreviation": "CT"
	},
	{
	"name": "Delaware",
	"abbreviation": "DE"
	},
	{
	"name": "District Of Columbia",
	"abbreviation": "DC"
	},
	{
	"name": "Federated States Of Micronesia",
	"abbreviation": "FM"
	},
	{
	"name": "Florida",
	"abbreviation": "FL"
	},
	{
	"name": "Georgia",
	"abbreviation": "GA"
	},
	{
	"name": "Guam",
	"abbreviation": "GU"
	},
	{
	"name": "Hawaii",
	"abbreviation": "HI"
	},
	{
	"name": "Idaho",
	"abbreviation": "ID"
	},
	{
	"name": "Illinois",
	"abbreviation": "IL"
	},
	{
	"name": "Indiana",
	"abbreviation": "IN"
	},
	{
	"name": "Iowa",
	"abbreviation": "IA"
	},
	{
	"name": "Kansas",
	"abbreviation": "KS"
	},
	{
	"name": "Kentucky",
	"abbreviation": "KY"
	},
	{
	"name": "Louisiana",
	"abbreviation": "LA"
	},
	{
	"name": "Maine",
	"abbreviation": "ME"
	},
	{
	"name": "Marshall Islands",
	"abbreviation": "MH"
	},
	{
	"name": "Maryland",
	"abbreviation": "MD"
	},
	{
	"name": "Massachusetts",
	"abbreviation": "MA"
	},
	{
	"name": "Michigan",
	"abbreviation": "MI"
	},
	{
	"name": "Minnesota",
	"abbreviation": "MN"
	},
	{
	"name": "Mississippi",
	"abbreviation": "MS"
	},
	{
	"name": "Missouri",
	"abbreviation": "MO"
	},
	{
	"name": "Montana",
	"abbreviation": "MT"
	},
	{
	"name": "Nebraska",
	"abbreviation": "NE"
	},
	{
	"name": "Nevada",
	"abbreviation": "NV"
	},
	{
	"name": "New Hampshire",
	"abbreviation": "NH"
	},
	{
	"name": "New Jersey",
	"abbreviation": "NJ"
	},
	{
	"name": "New Mexico",
	"abbreviation": "NM"
	},
	{
	"name": "New York",
	"abbreviation": "NY"
	},
	{
	"name": "North Carolina",
	"abbreviation": "NC"
	},
	{
	"name": "North Dakota",
	"abbreviation": "ND"
	},
	{
	"name": "Northern Mariana Islands",
	"abbreviation": "MP"
	},
	{
	"name": "Ohio",
	"abbreviation": "OH"
	},
	{
	"name": "Oklahoma",
	"abbreviation": "OK"
	},
	{
	"name": "Oregon",
	"abbreviation": "OR"
	},
	{
	"name": "Palau",
	"abbreviation": "PW"
	},
	{
	"name": "Pennsylvania",
	"abbreviation": "PA"
	},
	{
	"name": "Puerto Rico",
	"abbreviation": "PR"
	},
	{
	"name": "Rhode Island",
	"abbreviation": "RI"
	},
	{
	"name": "South Carolina",
	"abbreviation": "SC"
	},
	{
	"name": "South Dakota",
	"abbreviation": "SD"
	},
	{
	"name": "Tennessee",
	"abbreviation": "TN"
	},
	{
	"name": "Texas",
	"abbreviation": "TX"
	},
	{
	"name": "Utah",
	"abbreviation": "UT"
	},
	{
	"name": "Vermont",
	"abbreviation": "VT"
	},
	{
	"name": "Virgin Islands",
	"abbreviation": "VI"
	},
	{
	"name": "Virginia",
	"abbreviation": "VA"
	},
	{
	"name": "Washington",
	"abbreviation": "WA"
	},
	{
	"name": "West Virginia",
	"abbreviation": "WV"
	},
	{
	"name": "Wisconsin",
	"abbreviation": "WI"
	},
	{
	"name": "Wyoming",
	"abbreviation": "WY"
	}
];

var isoCountries = [
    {'ccode' : 'AF', 'cname' : 'Afghanistan'},
    {'ccode' : 'AX', 'cname' : 'Aland Islands'},
    {'ccode' : 'AL', 'cname' : 'Albania'},
    {'ccode' : 'DZ', 'cname' : 'Algeria'},
    {'ccode' : 'AS', 'cname' : 'American Samoa'},
    {'ccode' : 'AD', 'cname' : 'Andorra'},
    {'ccode' : 'AO', 'cname' : 'Angola'},
    {'ccode' : 'AI', 'cname' : 'Anguilla'},
    {'ccode' : 'AQ', 'cname' : 'Antarctica'},
    {'ccode' : 'AG', 'cname' : 'Antigua And Barbuda'},
    {'ccode' : 'AR', 'cname' : 'Argentina'},
    {'ccode' : 'AM', 'cname' : 'Armenia'},
    {'ccode' : 'AW', 'cname' : 'Aruba'},
    {'ccode' : 'AU', 'cname' : 'Australia'},
    {'ccode' : 'AT', 'cname' : 'Austria'},
    {'ccode' : 'AZ', 'cname' : 'Azerbaijan'},
    {'ccode' : 'BS', 'cname' : 'Bahamas'},
    {'ccode' : 'BH', 'cname' : 'Bahrain'},
    {'ccode' : 'BD', 'cname' : 'Bangladesh'},
    {'ccode' : 'BB', 'cname' : 'Barbados'},
    {'ccode' : 'BY', 'cname' : 'Belarus'},
    {'ccode' : 'BE', 'cname' : 'Belgium'},
    {'ccode' : 'BZ', 'cname' : 'Belize'},
    {'ccode' : 'BJ', 'cname' : 'Benin'},
    {'ccode' : 'BM', 'cname' : 'Bermuda'},
    {'ccode' : 'BT', 'cname' : 'Bhutan'},
    {'ccode' : 'BO', 'cname' : 'Bolivia'},
    {'ccode' : 'BA', 'cname' : 'Bosnia And Herzegovina'},
    {'ccode' : 'BW', 'cname' : 'Botswana'},
    {'ccode' : 'BV', 'cname' : 'Bouvet Island'},
    {'ccode' : 'BR', 'cname' : 'Brazil'},
    {'ccode' : 'IO', 'cname' : 'British Indian Ocean Territory'},
    {'ccode' : 'BN', 'cname' : 'Brunei Darussalam'},
    {'ccode' : 'BG', 'cname' : 'Bulgaria'},
    {'ccode' : 'BF', 'cname' : 'Burkina Faso'},
    {'ccode' : 'BI', 'cname' : 'Burundi'},
    {'ccode' : 'KH', 'cname' : 'Cambodia'},
    {'ccode' : 'CM', 'cname' : 'Cameroon'},
    {'ccode' : 'CA', 'cname' : 'Canada'},
    {'ccode' : 'CV', 'cname' : 'Cape Verde'},
    {'ccode' : 'KY', 'cname' : 'Cayman Islands'},
    {'ccode' : 'CF', 'cname' : 'Central African Republic'},
    {'ccode' : 'TD', 'cname' : 'Chad'},
    {'ccode' : 'CL', 'cname' : 'Chile'},
    {'ccode' : 'CN', 'cname' : 'China'},
    {'ccode' : 'CX', 'cname' : 'Christmas Island'},
    {'ccode' : 'CC', 'cname' : 'Cocos (Keeling) Islands'},
    {'ccode' : 'CO', 'cname' : 'Colombia'},
    {'ccode' : 'KM', 'cname' : 'Comoros'},
    {'ccode' : 'CG', 'cname' : 'Congo'},
    {'ccode' : 'CD', 'cname' : 'Congo, Democratic Republic'},
    {'ccode' : 'CK', 'cname' : 'Cook Islands'},
    {'ccode' : 'CR', 'cname' : 'Costa Rica'},
    {'ccode' : 'CI', 'cname' : 'Cote D\'Ivoire'},
    {'ccode' : 'HR', 'cname' : 'Croatia'},
    {'ccode' : 'CU', 'cname' : 'Cuba'},
    {'ccode' : 'CY', 'cname' : 'Cyprus'},
    {'ccode' : 'CZ', 'cname' : 'Czech Republic'},
    {'ccode' : 'DK', 'cname' : 'Denmark'},
    {'ccode' : 'DJ', 'cname' : 'Djibouti'},
    {'ccode' : 'DM', 'cname' : 'Dominica'},
    {'ccode' : 'DO', 'cname' : 'Dominican Republic'},
    {'ccode' : 'EC', 'cname' : 'Ecuador'},
    {'ccode' : 'EG', 'cname' : 'Egypt'},
    {'ccode' : 'SV', 'cname' : 'El Salvador'},
    {'ccode' : 'GQ', 'cname' : 'Equatorial Guinea'},
    {'ccode' : 'ER', 'cname' : 'Eritrea'},
    {'ccode' : 'EE', 'cname' : 'Estonia'},
    {'ccode' : 'ET', 'cname' : 'Ethiopia'},
    {'ccode' : 'FK', 'cname' : 'Falkland Islands (Malvinas)'},
    {'ccode' : 'FO', 'cname' : 'Faroe Islands'},
    {'ccode' : 'FJ', 'cname' : 'Fiji'},
    {'ccode' : 'FI', 'cname' : 'Finland'},
    {'ccode' : 'FR', 'cname' : 'France'},
    {'ccode' : 'GF', 'cname' : 'French Guiana'},
    {'ccode' : 'PF', 'cname' : 'French Polynesia'},
    {'ccode' : 'TF', 'cname' : 'French Southern Territories'},
    {'ccode' : 'GA', 'cname' : 'Gabon'},
    {'ccode' : 'GM', 'cname' : 'Gambia'},
    {'ccode' : 'GE', 'cname' : 'Georgia'},
    {'ccode' : 'DE', 'cname' : 'Germany'},
    {'ccode' : 'GH', 'cname' : 'Ghana'},
    {'ccode' : 'GI', 'cname' : 'Gibraltar'},
    {'ccode' : 'GR', 'cname' : 'Greece'},
    {'ccode' : 'GL', 'cname' : 'Greenland'},
    {'ccode' : 'GD', 'cname' : 'Grenada'},
    {'ccode' : 'GP', 'cname' : 'Guadeloupe'},
    {'ccode' : 'GU', 'cname' : 'Guam'},
    {'ccode' : 'GT', 'cname' : 'Guatemala'},
    {'ccode' : 'GG', 'cname' : 'Guernsey'},
    {'ccode' : 'GN', 'cname' : 'Guinea'},
    {'ccode' : 'GW', 'cname' : 'Guinea-Bissau'},
    {'ccode' : 'GY', 'cname' : 'Guyana'},
    {'ccode' : 'HT', 'cname' : 'Haiti'},
    {'ccode' : 'HM', 'cname' : 'Heard Island & Mcdonald Islands'},
    {'ccode' : 'VA', 'cname' : 'Holy See (Vatican City State)'},
    {'ccode' : 'HN', 'cname' : 'Honduras'},
    {'ccode' : 'HK', 'cname' : 'Hong Kong'},
    {'ccode' : 'HU', 'cname' : 'Hungary'},
    {'ccode' : 'IS', 'cname' : 'Iceland'},
    {'ccode' : 'IN', 'cname' : 'India'},
    {'ccode' : 'ID', 'cname' : 'Indonesia'},
    {'ccode' : 'IR', 'cname' : 'Iran, Islamic Republic Of'},
    {'ccode' : 'IQ', 'cname' : 'Iraq'},
    {'ccode' : 'IE', 'cname' : 'Ireland'},
    {'ccode' : 'IM', 'cname' : 'Isle Of Man'},
    {'ccode' : 'IL', 'cname' : 'Israel'},
    {'ccode' : 'IT', 'cname' : 'Italy'},
    {'ccode' : 'JM', 'cname' : 'Jamaica'},
    {'ccode' : 'JP', 'cname' : 'Japan'},
    {'ccode' : 'JE', 'cname' : 'Jersey'},
    {'ccode' : 'JO', 'cname' : 'Jordan'},
    {'ccode' : 'KZ', 'cname' : 'Kazakhstan'},
    {'ccode' : 'KE', 'cname' : 'Kenya'},
    {'ccode' : 'KI', 'cname' : 'Kiribati'},
    {'ccode' : 'KR', 'cname' : 'Korea'},
    {'ccode' : 'KW', 'cname' : 'Kuwait'},
    {'ccode' : 'KG', 'cname' : 'Kyrgyzstan'},
    {'ccode' : 'LA', 'cname' : 'Lao People\'s Democratic Republic'},
    {'ccode' : 'LV', 'cname' : 'Latvia'},
    {'ccode' : 'LB', 'cname' : 'Lebanon'},
    {'ccode' : 'LS', 'cname' : 'Lesotho'},
    {'ccode' : 'LR', 'cname' : 'Liberia'},
    {'ccode' : 'LY', 'cname' : 'Libyan Arab Jamahiriya'},
    {'ccode' : 'LI', 'cname' : 'Liechtenstein'},
    {'ccode' : 'LT', 'cname' : 'Lithuania'},
    {'ccode' : 'LU', 'cname' : 'Luxembourg'},
    {'ccode' : 'MO', 'cname' : 'Macao'},
    {'ccode' : 'MK', 'cname' : 'Macedonia'},
    {'ccode' : 'MG', 'cname' : 'Madagascar'},
    {'ccode' : 'MW', 'cname' : 'Malawi'},
    {'ccode' : 'MY', 'cname' : 'Malaysia'},
    {'ccode' : 'MV', 'cname' : 'Maldives'},
    {'ccode' : 'ML', 'cname' : 'Mali'},
    {'ccode' : 'MT', 'cname' : 'Malta'},
    {'ccode' : 'MH', 'cname' : 'Marshall Islands'},
    {'ccode' : 'MQ', 'cname' : 'Martinique'},
    {'ccode' : 'MR', 'cname' : 'Mauritania'},
    {'ccode' : 'MU', 'cname' : 'Mauritius'},
    {'ccode' : 'YT', 'cname' : 'Mayotte'},
    {'ccode' : 'MX', 'cname' : 'Mexico'},
    {'ccode' : 'FM', 'cname' : 'Micronesia, Federated States Of'},
    {'ccode' : 'MD', 'cname' : 'Moldova'},
    {'ccode' : 'MC', 'cname' : 'Monaco'},
    {'ccode' : 'MN', 'cname' : 'Mongolia'},
    {'ccode' : 'ME', 'cname' : 'Montenegro'},
    {'ccode' : 'MS', 'cname' : 'Montserrat'},
    {'ccode' : 'MA', 'cname' : 'Morocco'},
    {'ccode' : 'MZ', 'cname' : 'Mozambique'},
    {'ccode' : 'MM', 'cname' : 'Myanmar'},
    {'ccode' : 'NA', 'cname' : 'Namibia'},
    {'ccode' : 'NR', 'cname' : 'Nauru'},
    {'ccode' : 'NP', 'cname' : 'Nepal'},
    {'ccode' : 'NL', 'cname' : 'Netherlands'},
    {'ccode' : 'AN', 'cname' : 'Netherlands Antilles'},
    {'ccode' : 'NC', 'cname' : 'New Caledonia'},
    {'ccode' : 'NZ', 'cname' : 'New Zealand'},
    {'ccode' : 'NI', 'cname' : 'Nicaragua'},
    {'ccode' : 'NE', 'cname' : 'Niger'},
    {'ccode' : 'NG', 'cname' : 'Nigeria'},
    {'ccode' : 'NU', 'cname' : 'Niue'},
    {'ccode' : 'NF', 'cname' : 'Norfolk Island'},
    {'ccode' : 'MP', 'cname' : 'Northern Mariana Islands'},
    {'ccode' : 'NO', 'cname' : 'Norway'},
    {'ccode' : 'OM', 'cname' : 'Oman'},
    {'ccode' : 'PK', 'cname' : 'Pakistan'},
    {'ccode' : 'PW', 'cname' : 'Palau'},
    {'ccode' : 'PS', 'cname' : 'Palestinian Territory, Occupied'},
    {'ccode' : 'PA', 'cname' : 'Panama'},
    {'ccode' : 'PG', 'cname' : 'Papua New Guinea'},
    {'ccode' : 'PY', 'cname' : 'Paraguay'},
    {'ccode' : 'PE', 'cname' : 'Peru'},
    {'ccode' : 'PH', 'cname' : 'Philippines'},
    {'ccode' : 'PN', 'cname' : 'Pitcairn'},
    {'ccode' : 'PL', 'cname' : 'Poland'},
    {'ccode' : 'PT', 'cname' : 'Portugal'},
    {'ccode' : 'PR', 'cname' : 'Puerto Rico'},
    {'ccode' : 'QA', 'cname' : 'Qatar'},
    {'ccode' : 'RE', 'cname' : 'Reunion'},
    {'ccode' : 'RO', 'cname' : 'Romania'},
    {'ccode' : 'RU', 'cname' : 'Russian Federation'},
    {'ccode' : 'RW', 'cname' : 'Rwanda'},
    {'ccode' : 'BL', 'cname' : 'Saint Barthelemy'},
    {'ccode' : 'SH', 'cname' : 'Saint Helena'},
    {'ccode' : 'KN', 'cname' : 'Saint Kitts And Nevis'},
    {'ccode' : 'LC', 'cname' : 'Saint Lucia'},
    {'ccode' : 'MF', 'cname' : 'Saint Martin'},
    {'ccode' : 'PM', 'cname' : 'Saint Pierre And Miquelon'},
    {'ccode' : 'VC', 'cname' : 'Saint Vincent And Grenadines'},
    {'ccode' : 'WS', 'cname' : 'Samoa'},
    {'ccode' : 'SM', 'cname' : 'San Marino'},
    {'ccode' : 'ST', 'cname' : 'Sao Tome And Principe'},
    {'ccode' : 'SA', 'cname' : 'Saudi Arabia'},
    {'ccode' : 'SN', 'cname' : 'Senegal'},
    {'ccode' : 'RS', 'cname' : 'Serbia'},
    {'ccode' : 'SC', 'cname' : 'Seychelles'},
    {'ccode' : 'SL', 'cname' : 'Sierra Leone'},
    {'ccode' : 'SG', 'cname' : 'Singapore'},
    {'ccode' : 'SK', 'cname' : 'Slovakia'},
    {'ccode' : 'SI', 'cname' : 'Slovenia'},
    {'ccode' : 'SB', 'cname' : 'Solomon Islands'},
    {'ccode' : 'SO', 'cname' : 'Somalia'},
    {'ccode' : 'ZA', 'cname' : 'South Africa'},
    {'ccode' : 'GS', 'cname' : 'South Georgia And Sandwich Isl.'},
    {'ccode' : 'ES', 'cname' : 'Spain'},
    {'ccode' : 'LK', 'cname' : 'Sri Lanka'},
    {'ccode' : 'SD', 'cname' : 'Sudan'},
    {'ccode' : 'SR', 'cname' : 'Suriname'},
    {'ccode' : 'SJ', 'cname' : 'Svalbard And Jan Mayen'},
    {'ccode' : 'SZ', 'cname' : 'Swaziland'},
    {'ccode' : 'SE', 'cname' : 'Sweden'},
    {'ccode' : 'CH', 'cname' : 'Switzerland'},
    {'ccode' : 'SY', 'cname' : 'Syrian Arab Republic'},
    {'ccode' : 'TW', 'cname' : 'Taiwan'},
    {'ccode' : 'TJ', 'cname' : 'Tajikistan'},
    {'ccode' : 'TZ', 'cname' : 'Tanzania'},
    {'ccode' : 'TH', 'cname' : 'Thailand'},
    {'ccode' : 'TL', 'cname' : 'Timor-Leste'},
    {'ccode' : 'TG', 'cname' : 'Togo'},
    {'ccode' : 'TK', 'cname' : 'Tokelau'},
    {'ccode' : 'TO', 'cname' : 'Tonga'},
    {'ccode' : 'TT', 'cname' : 'Trinidad And Tobago'},
    {'ccode' : 'TN', 'cname' : 'Tunisia'},
    {'ccode' : 'TR', 'cname' : 'Turkey'},
    {'ccode' : 'TM', 'cname' : 'Turkmenistan'},
    {'ccode' : 'TC', 'cname' : 'Turks And Caicos Islands'},
    {'ccode' : 'TV', 'cname' : 'Tuvalu'},
    {'ccode' : 'UG', 'cname' : 'Uganda'},
    {'ccode' : 'UA', 'cname' : 'Ukraine'},
    {'ccode' : 'AE', 'cname' : 'United Arab Emirates'},
    {'ccode' : 'GB', 'cname' : 'United Kingdom'},
    {'ccode' : 'US', 'cname' : 'United States'},
    {'ccode' : 'UM', 'cname' : 'United States Outlying Islands'},
    {'ccode' : 'UY', 'cname' : 'Uruguay'},
    {'ccode' : 'UZ', 'cname' : 'Uzbekistan'},
    {'ccode' : 'VU', 'cname' : 'Vanuatu'},
    {'ccode' : 'VE', 'cname' : 'Venezuela'},
    {'ccode' : 'VN', 'cname' : 'Viet Nam'},
    {'ccode' : 'VG', 'cname' : 'Virgin Islands, British'},
    {'ccode' : 'VI', 'cname' : 'Virgin Islands, U.S.'},
    {'ccode' : 'WF', 'cname' : 'Wallis And Futuna'},
    {'ccode' : 'EH', 'cname' : 'Western Sahara'},
    {'ccode' : 'YE', 'cname' : 'Yemen'},
    {'ccode' : 'ZM', 'cname' : 'Zambia'},
    {'ccode' : 'ZW', 'cname' : 'Zimbabwe'}
];
for(let i = 0; i < isoCountries.length; i++) {
	isoCountries[i].cname = isoCountries[i].cname.toUpperCase();
}

function convertSame(s) {
	s = s.toUpperCase();
	if(s === "BRITAIN" || s === "ENGLAND" || s === "SCOTLAND") {
		s = "UNITED KINGDOM";
	}
	if(s === "USA" || s === "AMERICA" || s === "UNITED STATES OF AMERICA"){
		s = "UNITED STATES";
	}
	return s;
}

module.exports = {
	nameFromCode: function(s) {
		s = convertSame(s);
		for(let i in isoCountries) {
			let x = isoCountries[i];
			if(x.ccode === s) {
				return x.cname;
			}
		}
		return "Unknown";
	},
	codeFromName: function(s) {
		s=convertSame(s);
		if(s !== "UNKNOWN") {
			for(let i in isoCountries) {
				let x = isoCountries[i];
				if(x.cname === s) {
					return x.ccode;
				}
			}
		}
		return "UN";
	},
	isCountry: function(s) {
		s = convertSame(s);
		for(let i = 0; i < isoCountries.length; i++) {
			if(s === isoCountries[i].cname) return true;
		}
		return false;
	},
	isUSState: function(s) {
		s = s.toUpperCase();
		for(let i = 0; i < usStates.length; i++) {
			if(s === usStates[i].name 
			  || s === usStates[i].abbreviation) 
				return true;
		}
		return false;
	}
};
